import { db } from "@/lib/db"
import { Workspace, boards, workspaces } from "@/lib/schema"
import { getUserId } from "@/lib/utils"
import { and, eq } from "drizzle-orm"

export const getWorkspace = async (boardId: string) => {
  const userId = getUserId()
  try {

    const board = await db.selectDistinct().from(boards).where(eq(boards.id, boardId))
    if (board.length === 0) {
      throw new Error("Invalid board id")
    }
    const workspaceData = await db
      .select()
      .from(workspaces)
      .where(and(eq(workspaces.userId, userId), eq(workspaces.boardId, boardId)))
    return { boardTitle: board[0].title, workspaces: workspaceData }
  } catch (error) {
    console.log(error)
    return false
  }
}

export const insertWorkspceItem = async (boardId: string, workspace: Omit<Workspace, "createdAt" | "updatedAt">) => {
  const userId = getUserId()
  try {
    await db
      .insert(workspaces)
      .values({
        ...workspace,
        boardId,
        userId
      })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
