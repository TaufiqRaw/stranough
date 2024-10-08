import { useGuitarBuilderContext } from "~/pages/guitar-builder/guitar-builder";
import { GuitarBuilder } from "stranough-common";
import { JSX, Show, createMemo } from "solid-js";
import { AssistantSelector } from "../../utils/assistant-selector";
import { bodyCoreWoodSelector } from "../../../selectors/electric/body-core-wood-selector";
import { bodyTopWoodSelector } from "../../../selectors/electric/body-top-wood-selector";
import { ConstructionMethodSelector } from "../../../selectors/electric/construction-method-selector";
import { JackSelector } from "../../../selectors/electric/jack-selector";
import { NeckWoodSelector } from "../../../selectors/electric/neck-wood-selector";
import { KnobSelector } from "../../../selectors/electric/knob-selector";
import { PickupConfigurationSelector } from "../../../selectors/electric/pickup-configuration-selector";
import { BackContourSelector } from "../../../selectors/electric/back-contour-selector";
import { TopContourSelector } from "../../../selectors/electric/top-contour-selector";
import { bodyTypeSelector } from "../../../selectors/electric/body-type-selector";
import { electricAssistantGuidance } from "./guidance";
import { TrussRodPositionSelector } from "../../../selectors/truss-rod-position-selector";
import { OmittedCommonAssistant } from "../common-assistant";
import { TopBindingSelector } from "../../../selectors/top-binding-selector";
import { Bridge2Selector, BridgeSelector } from "../../../selectors/electric/bridge-selector";
import { PickupSelector } from "../../../selectors/electric/pickup-selector";
import { InlaySelector } from "../../../selectors/electric/inlay-selector";


type OmittedElectric = 'stringCount' | 'neckProfile' | 'guitarModel'| keyof Omit<GuitarBuilder.SelectedItem['acoustic'], OmittedCommonAssistant>

export const electricAssistant : {
  [k in keyof Omit<GuitarBuilder.SelectedItem['electric'], OmittedElectric>] : () => JSX.Element
} = {
  backContour : BackContourAssist,
  bodyCoreWood : BodyCoreWoodAssist,
  headstockColor : () => <div></div>,
  headstockColorType : () => <div></div>,
  pickguard : () => <div></div>,
  bodyLogo : () => <div></div>,
  bodyTopWood : BodyTopWoodAssist,
  bodyType : BodyTypeAssist,
  bridge : BridgeAssist,
  constructionMethod : ConstructionMethodAssist,
  headstockLogo : () => <div></div>,
  // jack : JackAssist,
  knob : KnobAssist,
  jack : JackAssist,
  inlay : InlayAssist,
  bridgePickup : BridgePickupAssist,
  middlePickup : MiddlePickupAssist,
  neckPickup : NeckPickupAssist,
  pickupConfiguration : PickupConfigurationAssist,
  // topBinding : TopBindingAssist,
  topContour : TopContourAssist,
  bridge2 : Bridge2Assist,
}

function BackContourAssist(){
  return <AssistantSelector
    title="Pilih contour belakang untuk body gitar"
    componentKey="backContour"
    itemSelector={BackContourSelector}
  />
}

function BodyCoreWoodAssist(){
  return <AssistantSelector
    title="Pilih kayu untuk body gitar"
    itemSelector={bodyCoreWoodSelector}
    componentKey="bodyCoreWood"
  />
}

function BodyTopWoodAssist(){
  return <AssistantSelector
    guidance={(ctx)=><>
      <Show when={ctx.electric.bodyType.get() === 'solid'}
        fallback={
          <div>
            Jika Anda memilih tipe body selain solid, maka anda wajib memilih kayu atas body.
          </div>
        }
      >
        <div>
          Jika Anda memilih tipe body solid, maka pilihan ini hanya berperan sebagai estetika.
        </div>
      </Show>
      <div>
      kayu Laminated berarti kayu tersebut hanya sebagai lapisan atas saja, sedangkan kayu solid berarti seluruh kayu body atas akan terbuat dari kayu tersebut.
      </div>
    </>}
    title="Pilih kayu untuk bagian atas body gitar"
    itemSelector={bodyTopWoodSelector}
    componentKey="bodyTopWood"
  />
}

function BodyTypeAssist(){
  return <AssistantSelector
    title="Pilih tipe body"
    componentKey="bodyType"
    itemSelector={bodyTypeSelector}
  />
}

function ConstructionMethodAssist(){
  return <AssistantSelector
    title="Pilih metode konstruksi"
    componentKey="constructionMethod"
    itemSelector={ConstructionMethodSelector}
  />
}

function InlayAssist(){
  return <AssistantSelector
    title="Pilih inlay"
    itemSelector={InlaySelector}
    componentKey="inlay"
  />
}

function JackAssist(){
  return <AssistantSelector
    title="Pilih Jack"
    componentKey="jack"
    itemSelector={JackSelector}
  />
}

function NeckPickupAssist(){
  return <AssistantSelector
    title="Pilih pickup untuk neck"
    itemSelector={()=><PickupSelector 
      pickupPosition="neck"
    />}
    componentKey="neckPickup"
  />
}

function MiddlePickupAssist(){
  return <AssistantSelector
    title="Pilih pickup untuk middle"
    itemSelector={()=><PickupSelector 
      pickupPosition="middle"
    />}
    componentKey="middlePickup"
  />
}

function BridgePickupAssist(){
  return <AssistantSelector
    title="Pilih pickup untuk bridge"
    itemSelector={()=><PickupSelector 
      pickupPosition="bridge"
    />}
    componentKey="bridgePickup"
  />
}

function KnobAssist(){
  return <AssistantSelector
    title="Pilih Knob"
    componentKey="knob"
    itemSelector={KnobSelector}
  />
}

function PickupConfigurationAssist(){
  return <AssistantSelector
    title="Pilih konfigurasi pickup"
    componentKey="pickupConfiguration"
    itemSelector={PickupConfigurationSelector}
  />
}

function TopContourAssist(){
  return <AssistantSelector
    title="Pilih kontur depan untuk body gitar"
    componentKey="topContour"
    itemSelector={TopContourSelector}
  />
}

function BridgeAssist(){
  return <AssistantSelector
    title="Pilih bridge"
    componentKey="bridge"
    itemSelector={BridgeSelector}
  />
}

function Bridge2Assist(){
  return <AssistantSelector
    title="Pilih bridge kedua"
    componentKey="bridge2"
    itemSelector={Bridge2Selector}
  />
}