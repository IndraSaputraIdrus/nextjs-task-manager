import { text, sqliteTable } from "drizzle-orm/sqlite-core"
import { timestamp } from "./timestamp"
import { relations } from "drizzle-orm"
import { workspacesTable } from "."

export const boards = sqliteTable("boards", {
  id: text('id').notNull().primaryKey(),
  userId: text("user_id").notNull(),
  title: text('title').notNull(),
  description: text("description"),
  ...timestamp
})

export const boardsRelations = relations(boards, ({many}) => ({
  workspaces: many(workspacesTable)
}))
