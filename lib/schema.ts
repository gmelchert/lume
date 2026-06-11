import { integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("category", ["ring", "bracelet"]);

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  category: categoryEnum("category").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  material: text("material").notNull(),
  imageUrl: text("image_url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
