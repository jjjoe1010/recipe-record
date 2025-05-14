"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { getRecipes } from "@/db/database";
import { recipes } from "@/db/schema";

import { InferModel} from "drizzle-orm"

type Recipe = InferModel<typeof recipes>;

export default function Home() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined);
  const [header, setHeader] = useState("recipeName");
  const [direction, setDirection] = useState("unsorted");

  async function getAllRecipes() {
    const result = await getRecipes()
    if (result) {
    setRecipes(result)
    }
  } 

  useEffect(() => {
    getAllRecipes();
  }, []);
  
  function handleSearch(formData:FormData){
    const query = formData.get("query");
    if (query != null){
      setSearch(query.toString())      
    }
  }

  function createRecipe(){
    console.log("Create Recipe")
    // // Resolve -> ID doesnt auto increment
    // const maxId = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) : 0;
    // let newRecipe = {
    //   id: maxId + 1,
    //   recipeName: "Hong Shao Rou",
    //   origin: "China",
    //   dateCreated: "26/04/25",
    //   ingridients: "Pork Belly, Rice",
    //   steps: "4",
    //   rating: "10/10",
    // };

    // let y = [
    //   ...recipes,
    //   newRecipe
    // ]
    // console.log(y)
    // setRecipes(y)
  }

  function handleSort(header: keyof Recipe) {
    setHeader(header);
    if (recipes === undefined) return
    let sortedRecipe = [...recipes].sort((a, b) => {
      let nameA = a[header];
      let nameB = b[header];

      if (typeof nameA === "string" && typeof nameB === "string") {
        nameA = nameA.toUpperCase();
        nameB = nameB.toUpperCase();
      }

      // unsorted, sorted, inverse sorted
      if (direction === "descending" || direction === "unsorted") {
        setDirection("ascending");
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
      if (direction === "ascending") {
        setDirection("descending");
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      }
      return 0;
    });
    setRecipes(sortedRecipe);
  }

  return (
    <section>
      <div className="flex justify-between p-10">
        <div>
          <h1 className="text-2xl">Recipe Records Log</h1>
        </div>
        <div>
          <p className="text-lg">username</p>
        </div>
      </div>
      <div>
        <div className="flex justify-end pt-20 pr-14 pb-10">
          {/* <form action={handleSearch}>
            <input name="query" />
            <button type="submit">Search</button>
          </form> */}
        </div>
      </div>
      <div className="px-10">
      <p>Current Sorted Direction - {direction}</p>
        <table className="table-fixed min-w-full">
          <thead>
            <tr className="text-left bg-gray-400/80">
              <th onClick={()=>handleSort("recipeName")}>Recipe</th>
              <th onClick={()=>handleSort("origin")}>Origin</th>
              <th onClick={()=>handleSort("dateCreated")}>Date Created</th>
              <th onClick={()=>handleSort("rating")}>Rating</th>
            </tr>            
          </thead>
          <tbody>
            {recipes && recipes.map((item) => (
            <tr className=" hover:bg-gray-300" key={item.recipeId}>
              <td className="text-left">{item.recipeName}</td>
              <td className="text-left">{item.origin}</td>
              <td className="text-left">{item.dateCreated.toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"})}</td>
              <td className="text-left">{item.rating}</td>
            </tr>              
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end pr-14">
        <button type="button" onClick={() => createRecipe()} className="pl-2 pr-2 rounded-full hover:bg-gray-300"> + Add recipe </button>
      </div>
    </section>
  );
}
