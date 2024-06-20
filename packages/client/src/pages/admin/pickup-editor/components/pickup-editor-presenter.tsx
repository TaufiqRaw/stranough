import { For, Show, createMemo } from "solid-js";
import { Graphics, Sprite } from "solid-pixi";
import { useEditorPageContext } from "~/commons/components/editor-page";
import { Position } from "~/commons/interfaces/position";
import { Constants } from "~/constants";
import { useGuitarPickup } from "../pickup-editor.page";
import { CommonPresenter } from "~/commons/presenter/common.presenter";
import { Texture } from "pixi.js";
import { useViewportContext } from "~/commons/components/viewport";
import { DropShadowFilter } from "pixi-filters";
import { guitarModelToPresenter } from "../../electric-model-editor/utils/functions/guitar-model-to-presenter";
import { GuitarModelPresenter } from "~/commons/presenter/guitar-model/guitar-model.presenter";

export function PickupEditorPresenter() {
  const pickup = createMemo(() => useGuitarPickup().get());
  const viewportCtx = useViewportContext();
  const editorCtx = useEditorPageContext();
  const Pickup = () => (
    <CommonPresenter
      filter={new DropShadowFilter({
        blur: 4,
        alpha: 0.2,
      })}
      texture={pickup()?.texture.get()?.filename}
      pivot={pickup()?.pivotPosition.get()}
      scale={pickup()?.scale.get()}
      onClick={p=>{
        if(pickup()?.selectedItem.get() === "pivot"){
          pickup()?.pivotPosition.set((prev) => {
            if (!prev)
              return {
                x: p.x,
                y: p.y,
              };
            return {
              x: prev.x + p.x,
              y: prev.y + p.y,
            };
          });
        }
      }}
    >
      <Sprite 
        zIndex={11} 
        texture={viewportCtx?.textures.target() ?? Texture.EMPTY}
        scale={0.2}
        anchor={0.5}
      />
    </CommonPresenter>
  );

  return (
    <Show
      when={
        editorCtx?.modelPreview.isShowModelPreview.get() &&
        editorCtx?.modelPreview.selectedModel()
      }
      fallback={Pickup()}
    >
      <GuitarModelPresenter
        {...guitarModelToPresenter(editorCtx!.modelPreview.selectedModel)}
        pickup={{
          bridge: ()=><Pickup />,
          neck: ()=><Pickup />,
          middle: ()=><Pickup />,
        }}
      />
    </Show>
  );
}