import { createWorkspaceItem } from '@/actions/workspace'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getWorkspace } from '@/services/workspaceService'
import { notFound } from 'next/navigation'
import React from 'react'

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
      <h1>Workspace</h1>
      <p>{boardTitle} - {boardId}</p>
      <form className="space-y-4 max-w-lg" action={createWorkspaceItem}>
        <input type="hidden" name="boardId" value={boardId} />
        <Input type="text" name="title" />
        <Button type="submit">Create</Button>
      </form>
      {workspaces.map(workspace => (
        <div>{workspace.title} - {workspace.status}</div>
      ))}
    </div>
  )
}
