"use server"

import { revalidatePath } from "next/cache"
import { generateId } from "lucia"
import { db } from "@/lib/db"
import { boardsTable } from "@/lib/db/schema"
import { z } from "zod"

const createBoardSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  // userId: z.string().min(1)
})

interface ActionResult {
  error: any
}

export const createBoard = async (_: any, data: FormData): Promise<ActionResult> => {
  const result = createBoardSchema.safeParse(Object.fromEntries(data))

  if (result.error) {
    return {
      error: result.error.flatten()
    }
  }

  const { description, title } = result.data
  const id = generateId(10)

  const inserted = await db.insert(boardsTable)
    .values({
      description,
      id,
      title,
      userId: "123",
    })
    .returning()
    .then(res => res[0])


  if (!inserted) {
    return { error: "failed" }
  }

  revalidatePath("/board")

  return { error: "success" }
}
