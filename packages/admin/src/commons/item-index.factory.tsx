import { useNavigate } from "@solidjs/router";
import { createQuery, useQueryClient } from "@tanstack/solid-query";
import { ServerEntities } from "stranough-server";
import { axios } from "./axios-instance";
import { For, Show, Suspense, createEffect, createMemo, createSignal } from "solid-js";
import { Button } from "./components/button";
import { serverImgUrl } from "./functions/server-img-url.util";

export function EntityIndexFactory<T extends ServerEntities.BaseEntity & {
  name : string;
  description : string;
  thumbnail : ServerEntities.Media | null;
}>(props : {
  entityName : string;
}){
  return ()=>{
    const queryClient = useQueryClient();
    const [page, setPage] = createSignal(1);
    const [limit, setLimit] = createSignal(10);
    const items = createQuery(()=>({
      queryKey : [props.entityName, {
        page : page(),
        limit : limit()
      }],
      queryFn : async ()=>{
        const {data} = await axios.get<[T[], number]>(`/${props.entityName}?page=${page()}?limit=${limit()}`);
        return data;
      }
    }))

    const maxPage = createMemo(()=> items.data? Math.ceil(items.data[1] / limit()): 1);

    async function deleteItem(id : number){
      if(confirm("Are you sure you want to delete this item?")){
        await axios.delete(`/${props.entityName}/${id}`);
        queryClient.invalidateQueries({
          queryKey : [props.entityName]
        });
      }
    }

    return <div class="p-3 h-full bg-slate-100">
      <Button href={`/${props.entityName}/new`}>
        Create New
      </Button>
      <Suspense>  
        <Show when={items.isSuccess}>
          <div class="grid grid-cols-4 gap-2 mt-3">
            <For each={items.data![0]}>
              {item => <div class="bg-white p-2 rounded-md group relative ">
                <div class="absolute right-2 p-2 bg-white rounded-md border border-gray-500 hidden group-hover:flex shadow-md gap-2">
                  <Button href={`/${props.entityName}/${item.id}`}>
                    <i class="bi bi-pen"/>
                  </Button>
                  <Button class="!bg-red-500" onClick={()=>deleteItem(item.id)}>
                    <i class="bi bi-trash"/>
                  </Button>
                </div>
                <img src={serverImgUrl(item.thumbnail?.filename)} alt={item.name + "-thumbnail"} class="w-full h-48 object-cover"/>
                <div class="p-2 relative h-36 overflow-hidden">
                  <div class="font-bold">{item.name}</div>
                  <div>{item.description}</div>
                  <div class="bg-gradient-to-t from-white to-[#ffffff00] h-10 absolute bottom-0 w-full" />
                </div>
              </div>}
            </For>
          </div>
          <div class="flex justify-center gap-2 mt-3">
            <Button onClick={()=> setPage(page() - 1)} disabled={page() === 1}>
              Prev
            </Button>
            <Button onClick={()=> setPage(page() + 1)} disabled={page() >= maxPage()}>
              Next
            </Button>
          </div>
        </Show>
      </Suspense>
    </div>
  }
}