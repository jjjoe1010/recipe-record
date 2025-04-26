"use server"
import clientPromise from "@/db/mongodb";

export const getRecipesFromMongo = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("recipe_records_log");
    const recipes = await db.collection("recipes").find({}).limit(10).toArray();
    return JSON.stringify(recipes);
  } catch (e) {
    console.error(e);
  }
}