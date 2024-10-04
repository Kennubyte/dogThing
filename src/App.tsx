import { Button } from "@suid/material";
import { createSignal, For } from "solid-js";

export default function App() {
  const [pics, setPics] = createSignal<string[]>([]);

  async function getDogs() {
    const dogsFetch = await fetch('https://dog.ceo/api/breeds/image/random/20')
    const parsedDogs = await dogsFetch.json()
    if(!parsedDogs.message) {
      alert("There was an error fetching the dogs.")
      return
    }
    console.log(parsedDogs.message)
    setPics(parsedDogs.message)
  }
  
  async function getCats() {
    const catsFetch = await fetch('https://api.thecatapi.com/v1/images/search?limit=20')
    const parsedCats = await catsFetch.json()
    if(!parsedCats) {
      alert("There was an error fetching the cats.")
      return
    }
    console.log(parsedCats)
    const catImgs: Array<string> = []

    parsedCats.forEach((cat: { url: string; }) => {
      catImgs.push(cat.url)
    })
    setPics(catImgs)
  }

  return (
    <div>
      <h1 class="text-3xl mb-5">
        <span class="line-through mr-3">Dogify</span>
        <span>Petify</span>
      </h1>
      <div class="flex gap-4">
        <Button variant="contained" onClick={getDogs}>Get dogs</Button>
        <Button variant="contained" onClick={getCats}>Get cats</Button>
      </div>
      <div class="grid grid-cols-3 gap-4 p-5">
        <For each={pics()}>
          {(pic) => (
            <div>
              <img src={pic} />
            </div>
          )}
        </For>

      </div>
    </div>
  );
}
