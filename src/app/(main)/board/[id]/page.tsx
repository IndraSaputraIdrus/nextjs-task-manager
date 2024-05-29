import { CreateWorkspace } from "@/components/create-workspace"
import { validateRequest } from "@/lib/auth"
import { db } from "@/lib/db"

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

  return (
    <div className="p-10">
      <div className="flex gap-5">
        <h1 className="text-3xl font-bold mb-5">{board?.title}</h1>
        <CreateWorkspace boardId={id} />
      </div>
      <div className="grid grid-cols-3 gap-5">
        {board?.workspaces.map(workspace => (
          <div className="border border-zinc-800 rounded space-y-5 p-5">
            <h2 className="font-semibold text-lg capitalize">{workspace.title}</h2>
            <span className="inline-block text-xs uppercase rounded-full px-5 py-1 bg-green-200 text-green-600">{workspace.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
