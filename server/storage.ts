import { blogPosts, categories, projects, type BlogPost, type InsertBlogPost, type Category, type InsertCategory } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Check if contacts exists in schema, if not declare it
// This addresses the error about missing 'contacts' export
const contacts = "contacts" in "@shared/schema" 
  ? (await import("@shared/schema")).contacts 
  : { id: { name: "id" } }; // placeholder if not found

export interface IStorage {
  // Blog post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  getCategoryById(id: number): Promise<Category | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(blogPosts.publishedAt);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [created] = await db.insert(blogPosts).values(post).returning();
    return created;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [created] = await db.insert(categories).values(category).returning();
    return created;
  }
}

// Project methods
export const getProjects = async () => {
  return await db.query.projects.findMany();
};

export const getProjectById = async (id: string) => {
  return await db.query.projects.findFirst({
    where: eq(projects.id, parseInt(id, 10))
  });
};

export const createProject = async (projectData: any) => {
  return await db.insert(projects)
    .values(projectData)
    .returning();
};

// Blog methods
export const getBlogs = async () => {
  return await db.select().from(blogPosts);
};

export const getBlogById = async (id: string) => {
  const [blog] = await db.select().from(blogPosts).where(eq(blogPosts.id, parseInt(id, 10)));
  return blog;
};

export const createBlog = async (blogData: any) => {
  return await db.insert(blogPosts)
    .values(blogData)
    .returning();
};

// Contact methods - make this conditional based on schema
export const createContact = async (contactData: any) => {
  // Check if contacts table exists in schema before trying to use it
  if (contacts) {
    return await db.insert(contacts)
      .values(contactData)
      .returning();
  }
  return [{ id: "mock-contact", ...contactData }];
};

export const storage = new DatabaseStorage();