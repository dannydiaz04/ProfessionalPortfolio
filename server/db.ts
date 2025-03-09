import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Create a mock DB implementation or use actual connection depending on environment
let pool;
let db;

if (process.env.DATABASE_URL) {
  // Only connect if database URL is provided
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
  console.log("Database connected successfully");
} else {
  console.log("No DATABASE_URL provided. Running without database connection.");
  // You can implement a mock DB here if needed
  db = {
    // Add any mock methods you might need during development
    query: async () => ({ rows: [] }),
    // Add other mock implementations as needed
  };
}

export { pool, db };
