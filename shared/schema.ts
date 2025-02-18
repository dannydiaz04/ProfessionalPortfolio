import { pgTable, text, serial, json, timestamp } from "drizzle-orm/pg-core";
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

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  slug: text("slug").notNull(),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  tags: text("tags").array().notNull()
});

export const insertProjectSchema = createInsertSchema(projects);
export const insertBusinessSchema = createInsertSchema(businesses);
export const insertBlogPostSchema = createInsertSchema(blogPosts, {
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 
    'Slug must be lowercase letters, numbers, and hyphens only'),
  excerpt: z.string().max(200, 'Excerpt must be 200 characters or less'),
});

export type Project = typeof projects.$inferSelect;
export type Business = typeof businesses.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;