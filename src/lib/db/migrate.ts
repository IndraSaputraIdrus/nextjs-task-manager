import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import { db, sqlite } from "."

try {
  migrate(db, { migrationsFolder: "drizzle" })
  console.log("migrate complete")
} catch (error) {
  console.log(error)
} finally {
  sqlite.close()
}
