import { Router } from "express";
import { validatePaginationMiddleware } from "../middlewares/validate-pagination.middleware";
import asyncMiddleware from "middleware-async";
import { getPagination } from "./get-pagination.util";
import { findAndPaginateEntity } from "./find-and-paginate-entity.util";
import { EntityRepository, Populate, Ref } from "@mikro-orm/postgresql";
import { DI } from "../app";
import { Class } from "utility-types";
import { validateDto } from "./validate-dto.util";
import { BaseEntityWithSprite, Media } from "../entities";
import { BadRequestError } from "./classes/error.class.util";
import { findOneEntity } from "./find-one-entity.util";
import { entityIndexMiddleware } from "../middlewares/entity-index.middleware";
import { entityPostMiddleware } from "../middlewares/entity-post.middleware";
import { entityDeleteMiddleware } from "../middlewares/entity-delete.middleware";
import { BaseEntityWithSpriteDto } from "../dtos/common-entity.dto";
import { entityGetMiddleware } from "../middlewares/entity-get.middleware";
import { findEachEntity } from "./find-one-multiple-entity";
import { Position } from "../interfaces/position.interface";

export function entityWithMediaRouterFactory<
  T extends {
    id : number;
    name : string;
    createdAt : Date;
    updatedAt : Date;
    loadMedias : () => Promise<void>;
  },
  U extends Partial<Omit<T, 'createdAt' | 'updatedAt' | 'loadMedias'>>,
>(repository: () => EntityRepository<T>, dto: Class<U>, mediaKeys : (keyof T)[]) {
  const router = Router();
  router.get("/", entityIndexMiddleware(repository, "name"));

  router.get(
    "/:id",
    entityGetMiddleware(repository, {
      populate: [...(mediaKeys as string[])] as any ,
    })
  );

  router.post(
    "/",
    entityPostMiddleware(async (req) => {
      const repo = repository();
      const { ...reqBody } = await validateDto(req, dto, {
        groups: ["create"],
      });

      const medias = findEachEntity(DI.repository.medias, mediaKeys.reduce((acc, key)=>{
        acc[key] = reqBody[key];
        return acc;
      }, {} as {[key in (keyof T)]: number}));

      return repo.create({
        ...reqBody,
        ...medias,
      });
    })
  );

  router.put(
    "/:id",
    asyncMiddleware(async (req, res) => {
      const repo = repository();
      const reqBody = await validateDto(req, dto, { groups: ["update"] });

      const id = parseInt(req.params.id);
      if (isNaN(id)) throw new BadRequestError("invalid id");

      const item = await findOneEntity(repo, id);
      if (!item) throw new BadRequestError("item not found");

      Object.assign(item, reqBody);

      await DI.em.flush();

      return res.json(item);
    })
  );

  router.delete(
    "/:id",
    entityDeleteMiddleware(repository, {
      async itemCallback(item) {
        await item.loadMedias();
      },
    })
  );

  return router;
}
