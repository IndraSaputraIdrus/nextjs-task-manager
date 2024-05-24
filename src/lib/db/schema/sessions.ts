import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { usersTable } from ".";

export const sessions = sqliteTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: integer("expires_at").notNull()
});
