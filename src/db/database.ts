"use server"
import { db } from"@/db";
import { recipes } from"@/db/schema";

export const getRecipes = async () => {
    const result = await db
    .select({
        recipeId: recipes.recipeId, 
        recipeName: recipes.recipeName,
        origin: recipes.origin,
        dateCreated: recipes.dateCreated,
        ingridients: recipes.ingridients,
        steps: recipes.steps,
        rating: recipes.rating
        }
    ).from(recipes)
    .limit(10)
return result
}