import { sql } from "drizzle-orm"
import { text, sqliteTable } from "drizzle-orm/sqlite-core"

const timestamps = {
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
};

export const boards = sqliteTable("boards", {
  id: text('id').notNull().primaryKey(),
  title: text('title').notNull(),
  description: text("description"),
  ...timestamps
})
