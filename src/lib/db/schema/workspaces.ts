import { text, sqliteTable } from "drizzle-orm/sqlite-core"
import { timestamp } from "./timestamp"
import { boards } from "./boards"

export const workspaces = sqliteTable("workspaces", {
  id: text("id").notNull().primaryKey(),
  boardId: text("board_id").notNull().references(() => boards.id),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  status: text("status", { enum: ["todo", "in-progress", "done"] }).notNull().default("todo"),
  ...timestamp
})
