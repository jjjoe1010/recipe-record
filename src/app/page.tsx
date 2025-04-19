"use client"
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const [search, setSearch] = useState("");

  function handleSearch(formData:FormData){
    const query = formData.get("query");
    if (query != null){
      setSearch(query.toString())      
    }
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
        <table className="table-fixed min-w-full">
          <tr className="text-left bg-gray-400/80">
            <th>Recipe</th>
            <th>Origin</th>
            <th>Date Created</th>
            <th>Rating</th>
          </tr>
          <tr className=" hover:bg-gray-300">
            <td className="text-left">Gyu Don</td>
            <td className="text-left">Japanese</td>
            <td className="text-left">17/04/25</td>
            <td className="text-left">8/10</td>
          </tr>
        </table>
      </div>
    </section>
  );
}
[]