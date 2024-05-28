import { EditorGuiGroup } from "~/commons/components/editor-gui";
import { Input } from "~/commons/components/input";
import { Textarea } from "~/commons/components/textarea";
import { SignalObject } from "~/commons/interfaces/signal-object";

export function NameDescriptionGroup(
  props : {
    name ?: SignalObject<string | undefined>,
    description ?: SignalObject<string | undefined>,
    placeholder ?: {
      name ?: SignalObject<string>,
      description ?: SignalObject<string>,
    }
  }
){
  return <EditorGuiGroup>
    <span class="text-sm -mt-1">Names</span>
    <Input
      class="!bg-gray-800 !text-white-950"
      placeholder="Model Name"
      value={props.name?.get() ?? props.placeholder?.name?.get()}
      oninput={(e) => {
        props.name?.set(e.target.value);
      }}
    />
    <span class="text-sm -mt-1">Description</span>
    <Textarea
      class="!bg-gray-800 !text-white-950"
      placeholder="Description"
      value={props.description?.get() ?? props.placeholder?.description?.get()}
      oninput={(e) => props.description?.set(e.target.value)}
    />
  </EditorGuiGroup>
}