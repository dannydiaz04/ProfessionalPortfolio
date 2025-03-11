import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Create a properly typed db instance
export let pool: Pool;
export let db: ReturnType<typeof drizzle<typeof schema>>;

if (process.env.DATABASE_URL) {
  // Only connect if database URL is provided
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
  console.log("Database connected successfully");
} else {
  console.log("No DATABASE_URL provided. Running with mock database.");
  // Create a mock pool that returns empty results
  const mockPool = {
    query: async () => ({ rows: [] }),
  } as unknown as Pool;
  
  pool = mockPool;
  db = drizzle(mockPool, { schema });
}
