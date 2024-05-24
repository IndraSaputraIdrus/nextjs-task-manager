import { text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const timestamp = {
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
}
