import { db } from "@/lib/db/"
import { Board, boardsTable } from "@/lib/db/schema"

export const getBoards = async () => {
  try {
    const boardsData = await db.select().from(boardsTable)
    return boardsData
  }
  catch (error) {
    console.log(error)
    return []
  }

}

export const insertBoard = async (board: Omit<Board, "createdAt" | "updatedAt" | "userId">) => {
  try {
    await db.insert(boardsTable).values({
      ...board,
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
