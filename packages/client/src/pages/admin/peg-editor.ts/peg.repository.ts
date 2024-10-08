import { ServerDtos} from "stranough-server";
import { Peg } from "./utils/types";
import { createPeg } from "./utils/create-peg";
import { createCommonRepository } from "~/commons/functions/create-common-repository";
import { nullOrValue } from "~/commons/functions/null-or-value";

export const pegRepository = createCommonRepository<Peg, ServerDtos.PegDto, {
  isBass ?: boolean,
  forSlottedHeadstock ?: boolean,
}
>(
  "pegs",
  createPeg,
  signalToDto
);

//TODO: add validation for pegPivotPosition pegBackPivotPosition, pegCapTexture, pegBackTexture
function signalToDto(b: Peg): ServerDtos.PegDto {
  return {
    description: b.description.get(),
    name: b.name.get(),
    price: b.price.get(),
    scale: b.scale.get(),
    pegBackTexture : b.pegBackTexture.get()?.id,
    pegCapTexture : b.pegCapTexture.get()?.id,
    pegRodTexture : b.pegRodTexture.get()?.id ?? null,
    pivotPosition: b.pivotPosition.get(),
    pegRodPivotPosition : b.pegRodPivotPosition.get(),
    isBass: b.isBass.get(),
    pegBackPivotPosition : b.pegBackPivotPosition.get(),
    thumbnail: nullOrValue(b.thumbnail.get(), b.thumbnail.get()?.id),
    forSlottedHeadstock: b.forSlottedHeadstock.get(),
    slottedGuardColor: b.slottedGuardColor.get() ?? null,
    slottedStringCount: b.slottedStringCount.get() ?? null,
  };
}
