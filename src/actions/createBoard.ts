"use server"

import { revalidatePath } from "next/cache"
import { insertBoard } from "@/services/boardService"

export default async function createBoard(_: any, data: FormData) {
  const title = data.get("title") as string || ""
  const description = data.get("description") as string || ""
  const id = crypto.randomUUID()


  const inserted = await insertBoard({ id, title, description })

  if (!inserted) {
    return { message: "failed" }
  }

  revalidatePath("/board")

  return { message: "success" }
}
