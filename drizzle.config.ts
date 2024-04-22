import type { Config } from "drizzle-kit"

export default {
  out: "./drizzle",
  driver: "better-sqlite",
  schema: "./src/lib/schema.ts",
  dbCredentials: {
    url: "sqlite.db"
  }
} satisfies Config
