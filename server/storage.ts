import type { BlogPost, Category, InsertBlogPost, InsertCategory } from "@shared/schema";

// Storage interface remains the same
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

// Static data for mock storage
const mockCategories: Category[] = [
  { id: 1, name: "Technology", slug: "technology", description: "Tech-related posts" },
  { id: 2, name: "Design", slug: "design", description: "Design-related posts" },
];

const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with React",
    content: "This is a guide to getting started with React...",
    excerpt: "Learn the basics of React in this introductory post",
    slug: "getting-started-with-react",
    publishedAt: new Date(),
    tags: ["react", "javascript", "frontend"],
    categoryId: 1
  },
];

// Replace database implementation with mock implementation
export class MockStorage implements IStorage {
  private blogPosts = [...mockBlogPosts];
  private categories = [...mockCategories];
  private nextBlogId = 2;
  private nextCategoryId = 3;

  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return [...this.blogPosts];
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return this.blogPosts.find(post => post.slug === slug);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const newPost = {
      ...post,
      id: this.nextBlogId++,
      publishedAt: new Date(),
    } as BlogPost;
    this.blogPosts.push(newPost);
    return newPost;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return [...this.categories];
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return this.categories.find(category => category.slug === slug);
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.find(category => category.id === id);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory = {
      ...category,
      id: this.nextCategoryId++
    } as Category;
    this.categories.push(newCategory);
    return newCategory;
  }
}

// Export a single instance to be used throughout the application
export const storage = new MockStorage();