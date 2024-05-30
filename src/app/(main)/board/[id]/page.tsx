import { CreateWorkspace } from "@/components/create-workspace"
import { WorkspaceItems } from "@/components/workspace-items"
import { validateRequest } from "@/lib/auth"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"

type Props = {
  params: {
    id: string
  }
}

const getBoardWithWorkspaces = async (id: string) => {
  const { user } = await validateRequest()
  if (!user) return

  return db.query.boardsTable.findFirst({
    where: (board, { eq, and }) => and(eq(board.id, id), eq(board.userId, user.id)),
    with: {
      workspaces: true
    }
  })
}

export default async function WorkSpace({ params: { id } }: Props) {
  const board = await getBoardWithWorkspaces(id)

  if (!board) return notFound()

  const { workspaces } = board

  return (
    <div className="p-10">
      <div className="flex gap-5">
        <h1 className="text-3xl font-bold mb-5">{board?.title}</h1>
        <CreateWorkspace boardId={id} />
      </div>
      <WorkspaceItems workspaces={workspaces} />
    </div>
  )
}
