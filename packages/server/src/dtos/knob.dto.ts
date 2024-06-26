import { IsBoolean, IsNotEmpty } from "class-validator";
import { EntityWithoutSprite } from "../interfaces/entity-without-base.interface";
import { BaseEntityWithSpriteDto } from "./common-entity.dto";
import { Knob } from "../entities";

export class KnobDto extends BaseEntityWithSpriteDto implements EntityWithoutSprite<Knob> {}