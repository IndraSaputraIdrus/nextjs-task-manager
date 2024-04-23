import { InferSelectModel, sql } from "drizzle-orm"
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
  userId: text("user_id").notNull(),
  title: text('title').notNull(),
  description: text("description"),
  ...timestamps
})

export const workspaces = sqliteTable("workspaces", {
  id: text("id").notNull().primaryKey(),
  boardId: text("board_id").notNull(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  status: text("status", { enum: ["todo", "in-progress", "done"] }).notNull().default("todo"),
  ...timestamps
})

export type Board = InferSelectModel<typeof boards>
export type Workspace = InferSelectModel<typeof workspaces>
