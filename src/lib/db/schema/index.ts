import { workspaces } from "./workspaces"
import { boards } from "./boards"
import { users } from "./users"
import { sessions } from "./sessions"
import { InferSelectModel } from "drizzle-orm"

export type Board = InferSelectModel<typeof boards>
export type Workspace = InferSelectModel<typeof workspaces>

export {
  workspaces as workspacesTable,
  boards as boardsTable,
  users as usersTable,
  sessions as sessionsTable
}
