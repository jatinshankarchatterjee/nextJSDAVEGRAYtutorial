import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schemas.ts",
  out: "./db/drizzleMigrations",    
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
