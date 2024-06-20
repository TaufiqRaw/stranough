import { Viewport } from "~/commons/components/viewport";
import { GuitarBuilderPresenter } from "./components/guitar-builder.presenter";
import { Chatbox } from "./components/chatbox";
import { Accessor, createContext, getOwner, useContext } from "solid-js";
import { IGuitarBuilder } from "./utils/types";
import { createGuitarComponent } from "./utils/create-guitar-component";
import createStoredSignal from "~/commons/functions/create-stored-signal";
import GuitarBuilderGui from "./components/gui/guitar-builder-gui";
import { ToggleableButton } from "~/commons/components/toggleable-button";
import { chatSocket } from "./utils/chat-socket";

const GuitarBuilderCtx = createContext< IGuitarBuilder | undefined>();

export function GuitarBuilder(){
  const guitarComponent = createGuitarComponent();

  const socket = chatSocket({
    owner : getOwner()!,
    guitarComponent,
  })

  const [_isBottomSideMenuSwiped, setIsBottomSideMenuSwiped] = createStoredSignal<boolean>('isBottomSideMenuSwiped', false);

  const isBottomSideMenuSwiped : IGuitarBuilder['isBottomSideMenuSwiped'] = {
    get : _isBottomSideMenuSwiped,
    swiped : ()=>setIsBottomSideMenuSwiped(true)
  }
  return (
    <div class="relative h-screen flex">
      <GuitarBuilderCtx.Provider value={{...guitarComponent, isBottomSideMenuSwiped, socket}}>
        <div class="lg:w-80 h-full">
          <GuitarBuilderGui/>
        </div>
        <div class="flex-1">
          <Viewport
            displayCenterIndicator={false}
            btnPositionClass="left-80 top-3"
          >
            <GuitarBuilderPresenter/>
          </Viewport>
        </div>
        <div class="lg:w-80 h-full">
          <Chatbox/>
        </div>
      </GuitarBuilderCtx.Provider>
    </div>
  )
}

export function useGuitarBuilderContext(){
  return useContext(GuitarBuilderCtx);
}