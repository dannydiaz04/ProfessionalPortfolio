import { pgTable, text, serial, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").array().notNull(),
  link: text("link"),
  imageUrl: text("image_url")
});

export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  role: text("role").notNull(),
  industry: text("industry").notNull(),
  link: text("link")
});

export const insertProjectSchema = createInsertSchema(projects);
export const insertBusinessSchema = createInsertSchema(businesses);

export type Project = typeof projects.$inferSelect;
export type Business = typeof businesses.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
