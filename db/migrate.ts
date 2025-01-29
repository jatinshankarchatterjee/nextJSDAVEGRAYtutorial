import { db } from "./index";
import { migrate } from "drizzle-orm/neon-http/migrator";

export const migrateDb = async () => {
  try {
    await migrate(db, { migrationsFolder: "./db/drizzleMigrations" });
    console.log("db migrated");
  } catch (error) {
    console.log("migration failed", error);
    process.exit(1);
  }
};

migrateDb();
