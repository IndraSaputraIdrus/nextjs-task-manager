import Link from "next/link";
import { CreateBoard } from "@/components/create-board"
import { db } from "@/lib/db";
import { boardsTable } from "@/lib/db/schema";
import { validateRequest } from "@/lib/auth";
import { eq } from "drizzle-orm"
import { Metadata } from "next"

const getBoards = async () => {
  const { user } = await validateRequest()

  if (!user) return

  return db.select().from(boardsTable).where(eq(boardsTable.userId, user.id))
}

export const metadata: Metadata = {
  title: `Task Manager | your board`
}


export default async function BoardPage() {
  const boards = await getBoards()
  return (
    <div className="p-10 space-y-5">
      <div className="flex items-center gap-5">
        <h1 className="text-4xl font-semibold">List board</h1>
        <CreateBoard />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        {
          boards && boards.map((board) => (
            <Link key={board.id} href={`/board/${board.id}`}>
              <div className="hover:text-blue-500 hover:border-blue-500 border-2 border-zinc-800 rounded p-5 transition">{board.title}</div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
