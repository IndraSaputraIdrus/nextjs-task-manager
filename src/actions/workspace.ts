"use server"

import { Workspace } from "@/lib/schema"
import { insertWorkspceItem, updateWorkspaceItem } from "@/services/workspaceService"
import { revalidatePath, revalidateTag } from "next/cache"

export const createWorkspaceItem = async (_: any, data: FormData) => {
  const boardId = data.get("boardId") as string || ""
  const title = data.get("title") as string || ""
  const status = data.get("status") || "todo"
  const id = crypto.randomUUID()

  const formData = {
    id, status, title, boardId
  } as Workspace

  const inserted = await insertWorkspceItem(boardId, formData)

  if (!inserted) {
    return { message: "failed" }
  }

  revalidatePath(`/board/${boardId}`)

  return { message: "success" }

}

export const updateWorkspaceItemAction = async (_: any, data: FormData) => {
  const id = data.get("id") as string
  const title = data.get("title") as string
  const status = data.get("status") as string
  const boardId = data.get("boardId") as string

  const formData = {
    id, title, status, boardId
  } as Workspace

  const updated = await updateWorkspaceItem(formData)

  if (updated) {
    return { message: "failed" }
  }

  revalidatePath(`/board/${boardId}`)

  return { message: "success" }
}
