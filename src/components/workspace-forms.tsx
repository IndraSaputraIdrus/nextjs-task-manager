"use client"

import WorkspaceCreateForm from "./workspace-create-form"
import WorkspaceUpdateForm from "./workspace-update-form"

type Props = {
  boardId: string
}

export default function WorkspaceForms({ boardId }: Props) {
  return (
    <>
      <WorkspaceCreateForm boardId={boardId} />
      <WorkspaceUpdateForm boardId={boardId} />
    </>
  )
}
