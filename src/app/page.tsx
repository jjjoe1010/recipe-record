"use client"
import Image from "next/image";
import { storedRecipe } from "./storage"
import { useState } from "react";

interface Recipe {
  id: number;
  recipeName: string;
  origin: string;
  dateCreated: string;
  ingridients: string;
  steps: string;
  rating: string;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>(storedRecipe);
  const [header, setHeader] = useState<keyof Recipe>("recipeName");
  const [direction, setDirection] = useState("unsorted");
  
  function handleSearch(formData:FormData){
    const query = formData.get("query");
    if (query != null){
      setSearch(query.toString())      
    }
  }

  function createRecipe(){
    console.log("create new recipe")
  }

  function handleSort(header: keyof Recipe){
    setHeader(header)
    let sortedRecipe = [...recipes].sort((a,b) => {

    let nameA: string | number = a[header]
    let nameB: string | number = b[header]

    if (typeof nameA === "string" && typeof nameB === "string") {
      nameA = nameA.toUpperCase()
      nameB = nameB.toUpperCase()
    }
      
      // unsorted, sorted, inverse sorted
      if (direction === "descending" || direction === "unsorted") {
        setDirection("ascending")
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
      if (direction === "ascending") {
        setDirection("descending")
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
   setRecipes(sortedRecipe)
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
          <form action={handleSearch}>
            <input name="query" />
            <button type="submit">Search</button>
          </form>
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
            {recipes.map((item) => (
            <tr className=" hover:bg-gray-300" key={item.id}>
              <td className="text-left">{item.recipeName}</td>
              <td className="text-left">{item.origin}</td>
              <td className="text-left">{item.dateCreated}</td>
              <td className="text-left">{item.rating}</td>
            </tr>              
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end pr-14">
        <button type="button" onClick={createRecipe} className="pl-2 pr-2 rounded-full hover:bg-gray-300"> + Add recipe </button>
      </div>
    </section>
  );
}
