import { db } from "@/lib/db"
import { boards } from "@/lib/schema"

export const getBoards = async () => {
  try {
    const boardsData = await db.select().from(boards)
    return boardsData
  }
  catch (error) {
    console.log(error)
  }

}
