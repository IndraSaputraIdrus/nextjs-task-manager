import { db } from "@/lib/db"
import { Board, boards } from "@/lib/schema"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export const getBoards = async () => {
  const { userId } = auth()

  if (!userId) {
    throw new Error("not authorized")
  }

  try {
    const boardsData = await db.select().from(boards).where(eq(boards.userId, userId))
    return boardsData
  }
  catch (error) {
    console.log(error)
    return []
  }

}

export const insertBoard = async (board: Omit<Board, "createdAt" | "updatedAt" | "userId">) => {
  const { userId } = auth()

  if (!userId) {
    throw new Error("not authorized")
  }

  try {
    await db.insert(boards).values({
      ...board,
      userId
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
