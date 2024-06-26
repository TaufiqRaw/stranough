import { For, createMemo } from "solid-js";
import { EditorGui, EditorGuiGroup, keyboardMove } from "~/commons/components/editor-gui";
import ImageInput from "~/commons/components/image-input";
import { Input } from "~/commons/components/input";
import ToggleableButtonWithState from "~/commons/components/toggleable-button-with-state";
import * as R from "remeda";
import { Constants } from "~/constants";
import { Button } from "~/commons/components/button";
import { ToggleableButton } from "~/commons/components/toggleable-button";
import { NameDescriptionGroup } from "~/commons/components/name-description-group";
import { useGuitarBridge } from "../bridge-editor.page";
import { ElectricModelPreviewExplorer } from "~/commons/components/electric-model-preview-explorer";

export function BridgeEditorGui() {
  const bridge = createMemo(() => useGuitarBridge().get());

  return (
    <EditorGui onKeydown={(key, t)=>{
      switch(key){
        case 'ArrowUp' :
        case 'ArrowDown' :
        case 'ArrowLeft' :
        case 'ArrowRight' : {
          keyboardMove(key, t, (speed) => bridge()?.getSelectedItem()?.set((prev) => ({
            x: ((prev?.x ?? 0) + speed.x),
            y: ((prev?.y ?? 0) + speed.y),
          })));
          break;
        }
        case 'x' : {
          bridge()?.getSelectedItem()?.set((prev)=>({x : 0, y : prev?.y ?? 0}));
          break;
        }
        case 'Escape' : {
          bridge()?.selectedItem.set();
          break;
        }
      }
    }}>
      <EditorGuiGroup parent>
        <span class="font-bold text-center mx-3">Bridge</span>
      </EditorGuiGroup>
      <ElectricModelPreviewExplorer />
      <NameDescriptionGroup
        description={bridge()?.description}
        name={bridge()?.name}
        placeholder={bridge()?.placeholder}
        price={bridge()?.price}
        thumbnail={bridge()?.thumbnail}
      />
      <EditorGuiGroup>
        <ImageInput
          label="Texture"
          partType="bridge"
          onError={(e) => console.error(e)}
          onLoad={(image) => {
            bridge()?.texture.set(image);
          }}
          onRemove={() => {
            bridge()?.texture.set(undefined);
          }}
          imageFilename={bridge()?.texture.get()?.filename}
        />
        <span>Scale</span>
        <input
          type="range"
          value={bridge()?.scale.get()}
          oninput={(e) => bridge()?.scale.set(parseFloat(e.target.value))}
          step={0.01}
          min={0.25}
          max={2}
        />
      </EditorGuiGroup>
      <EditorGuiGroup parent>
        <span class="font-bold text-center mx-3">Points</span>
      </EditorGuiGroup>
      <EditorGuiGroup>
        <ToggleableButton
          isActive={bridge()?.selectedItem?.get() === "pivot"}
          onClick={() => bridge()?.selectedItem?.set("pivot")}
        >
          Pivot Point
        </ToggleableButton>
        <span class="text-sm -mt-1">String Points</span>
        <Input
          class="!bg-gray-800 !text-white-950 w-14"
          type="number"
          min={1}
          value={bridge()?.stringCount.get()}
          onChange={(e) =>
            bridge()?.stringCount.set(parseInt(e.target.value) || 1)
          }
        />
        <For each={bridge()?.stringSpawnPoint.state()}>
          {(spp, x) => (
            <div class="border border-gray-500 my-2 px-2 py-4 rounded-md flex justify-between gap-2">
              <For each={spp.state()}>
                {(sp, y) => (
                  <ToggleableButtonWithState
                    isActive={!!sp.get()}
                    class="!border-0 w-3 !p-0"
                    isFocus={R.isDeepEqual(
                      bridge()?.stringSpawnPoint.selectedIndex.get(),
                      [x(), y()]
                    )}
                    onClick={() => {
                      if (!!sp.get()) {
                        sp.set(Constants.defaultPos);
                      }
                      bridge()?.stringSpawnPoint.selectedIndex.set([x(), y()]);
                      bridge()?.selectedItem?.set("stringSpawnPoint");
                    }}
                  />
                )}
              </For>
            </div>
          )}
        </For>
        <Button onClick={() => bridge()?.stringSpawnPoint.add()}>
          <i class="bi bi-plus"></i>
        </Button>
      </EditorGuiGroup>
      <Button class="mx-3 mt-5" onClick={bridge()?.save}>
        Save
      </Button>
    </EditorGui>
  );
}
