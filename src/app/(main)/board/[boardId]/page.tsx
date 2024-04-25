import { createWorkspaceItem } from '@/actions/workspace'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getWorkspace } from '@/services/workspaceService'
import { notFound } from 'next/navigation'
import WorkspaceList from '@/components/workspace-list'
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger
} from "@/components/ui/select"

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
      <h1 className="text-3xl font-bold">Workspace - {boardTitle}</h1>
      <form className="space-y-4 max-w-lg" action={createWorkspaceItem}>
        <input type="hidden" name="boardId" value={boardId} />
        <Input placeholder="Enter title" type="text" name="title" />
        <Select name="status">
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">Todo</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Create</Button>
      </form>
      <WorkspaceList workspaces={workspaces} />
    </div>
  )
}
