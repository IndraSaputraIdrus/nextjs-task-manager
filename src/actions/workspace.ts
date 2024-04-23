"use server"

import { insertWorkspceItem } from "@/services/workspaceService"
import { revalidatePath } from "next/cache"

export const createWorkspaceItem = async (data: FormData) => {
  const boardId = data.get("boardId") as string || ""
  const title = data.get("title") as string || ""
  const id = crypto.randomUUID()

  const inserted = await insertWorkspceItem(boardId, { id, title })

  if (!inserted) {
    return { message: "failed" }
  }

  revalidatePath(`/board/${boardId}`)

  return { message: "success" }

}
