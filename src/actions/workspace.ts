"use server"

import { Workspace } from "@/lib/schema"
import { insertWorkspceItem } from "@/services/workspaceService"
import { revalidatePath } from "next/cache"

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
