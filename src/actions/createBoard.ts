"use server"

import { db } from "@/lib/db"
import { boards } from "@/lib/schema"
import { revalidatePath } from "next/cache"

export default async function createBoard(_: any, data: FormData) {
  const title = data.get("title") as string || ""
  const description = data.get("description") as string || ""
  const id = crypto.randomUUID()

  await db.insert(boards).values({
    title, id, description
  })

  revalidatePath("/board")

  return { message: "success" }
}
