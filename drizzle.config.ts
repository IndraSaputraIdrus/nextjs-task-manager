import { defineConfig } from "drizzle-kit"

const config = defineConfig({
  out: "./drizzle",
  schema: "./src/lib/db/schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "sqlite.db"
  },
  strict: true,
  verbose: true
})

export default config
