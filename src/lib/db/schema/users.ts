import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { generateId } from "lucia"
import { timestamp } from "./timestamp"

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => generateId(10)),
  username: text("username").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  ...timestamp
})
