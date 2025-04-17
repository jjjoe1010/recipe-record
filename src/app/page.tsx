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
    </section>
  );
}
