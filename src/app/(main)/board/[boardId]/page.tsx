import { getWorkspace } from '@/services/workspaceService'
import { notFound } from 'next/navigation'
import WorkspaceList from '@/components/workspace-list'
import WorkspaceForm from '@/components/workspace-form'


type Props = {
  params: {
    boardId: string
  }
}

export default async function WorkSpace({ params: { boardId } }: Props) {

  const workspacesData = await getWorkspace(boardId)

  if (!workspacesData) {
    return notFound()
  }

  const { workspaces, boardTitle } = workspacesData

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Workspace - {boardTitle}</h1>
      <WorkspaceForm boardId={boardId} />
      <WorkspaceList workspaces={workspaces} />
    </div>
  )
}
