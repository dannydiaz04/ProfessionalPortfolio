import { pgTable, text, serial, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description")
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull()
});

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
  tags: text("tags").array().notNull(),
  categoryId: serial("category_id").references(() => categories.id)
});

export const insertCategorySchema = createInsertSchema(categories, {
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 
    'Slug must be lowercase letters, numbers, and hyphens only'),
});

export const insertUserSchema = createInsertSchema(users);
export const insertProjectSchema = createInsertSchema(projects);
export const insertBusinessSchema = createInsertSchema(businesses);
export const insertBlogPostSchema = createInsertSchema(blogPosts, {
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 
    'Slug must be lowercase letters, numbers, and hyphens only'),
  excerpt: z.string().max(200, 'Excerpt must be 200 characters or less'),
});

// Export types
export type Category = typeof categories.$inferSelect;
export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Business = typeof businesses.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;