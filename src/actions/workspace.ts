"use server"

import { boardsTable, workspacesTable } from "@/lib/db/schema"
import { db } from "@/lib/db"
import { generateId } from "lucia"
import { revalidatePath, } from "next/cache"
import { z } from "zod"
import { validateRequest } from "@/lib/auth"
import { eq } from "drizzle-orm"

const createWorkspaceSchema = z.object({
  title: z.string().min(3),
  boardId: z.string().min(1)
})

const updateWorkspaceSchema = z.object({
  title: z.string().min(3),
  id: z.string().min(1),
  boardId: z.string().min(1)
})

type ActionResult = {
  error: any
}

export const createWorkspaceItem = async (_: any, data: FormData): Promise<ActionResult> => {
  const { user } = await validateRequest()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const validate = createWorkspaceSchema.safeParse(Object.fromEntries(data))

  if (validate.error) {
    return {
      error: validate.error.flatten().fieldErrors
    }
  }

  const { boardId, title } = validate.data
  const id = generateId(10)

  const existingBoard = await db
    .select()
    .from(boardsTable)
    .where(eq(boardsTable.id, boardId))
    .then(res => res[0])

  if(!existingBoard) {
    return {
      error: "Board not found"
    }
  }

  await db
    .insert(workspacesTable)
    .values({ id, boardId, title, userId: user.id })

  revalidatePath(`/board/${boardId}`)

  return { error: "" }
}


export const updateWorkspaceItem = async (_: any, data: FormData): Promise<ActionResult> => {
  const { user } = await validateRequest()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const validate = updateWorkspaceSchema.safeParse(Object.fromEntries(data))

  if (validate.error) {
    return {
      error: validate.error.flatten().fieldErrors
    }
  }

  const { boardId, title, id } = validate.data

  const existingWorkspace = await db
    .select()
    .from(workspacesTable)
    .where(eq(workspacesTable.id, id))
    .then(res => res[0])

  if(!existingWorkspace) {
    return {
      error: "Workspace not found"
    }
  }

  await db
    .update(workspacesTable)
    .set({title})
    .where(eq(workspacesTable.id, id))

  revalidatePath(`/board/${boardId}`)

  return { error: "" }
}
