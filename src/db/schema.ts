import { relations, sql } from "drizzle-orm";

import {
  pgTableCreator,
  timestamp,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";


export const createTable = pgTableCreator((name) => `rr_${name}`);

export const recipes = createTable("recipes", {
    recipeId: uuid("recipe_id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    
    recipeName: varchar("recipe_name",{length:128}).default("Unamed Recipe").notNull(),

    origin: varchar("origin",{length:128}).default("unknown").notNull(),

    dateCreated: timestamp("created_at").defaultNow().notNull(),
    
    ingridients: varchar("ingridients",{length:1024}).notNull(),

    steps:varchar("steps",{length:1024}).default("").notNull(),

    rating:integer("rating").default(0).notNull(),

  });