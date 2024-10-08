import { Entity, Index, ManyToOne, OneToMany, Property, Ref, ref } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import {PosRotWithFlipped, Position, PositionWithRotation} from "../interfaces/position.interface";
import { EntityWithSprite, EntityWithoutBase } from "../interfaces/entity-without-base.interface";
import { classAssign } from "../utils/class-assign.util";
import { Media } from "./media.entity";
import { idProperty } from "../utils/id-property.util";
import { ElectricGuitarModel } from "./_electric-guitar-model.entity";
import { maxDescriptionLength, mediaFKOption } from "../constants";
import { BaseEntityWithSprite } from "./base-with-sprite.entity";

export interface HeadstockProps extends EntityWithSprite<Headstock> {}

@Entity()
// @Index({ name: 'headstock_hnsw_l2_idx', expression: 'CREATE INDEX "headstock_hnsw_l2_idx" ON "headstock" USING hnsw (embedding vector_l2_ops)' })
export class Headstock extends BaseEntityWithSprite {

  @Property({type : 'smallint'})
  stringCount : number;

  @Property({type : 'json'})
  pegsSpawnPoint : PosRotWithFlipped[];

  @ManyToOne(()=>Media,mediaFKOption)
  frontShadowTexture ?: Ref<Media>;

  @ManyToOne(()=>Media,mediaFKOption)
  backShadowTexture ?: Ref<Media>;

  @Property()
  isSlotted : boolean;

  @Property({ type: "json" })
  logoSpawnPoint?: PositionWithRotation;

  @Property()
  slottedRodOffset ?: number;

  @Property()
  slottedGuardLength ?: number;

  @Property({ type: "json" })
  slottedGuardSpawnPoint ?: PositionWithRotation[];

  constructor(props : HeadstockProps){
    super();
    const {texture, thumbnail,..._props} = props;
    classAssign(this, _props);
    this.ctorMedias({texture, thumbnail});
  }

  async loadMedias(){
    await this.texture?.load();
    await this.thumbnail?.load();
  }
}