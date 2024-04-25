"use client"

import { Workspace } from "@/lib/schema"
import WorkspaceCard from "./workspace-card"

type Props = {
  workspaces: Array<Workspace>
}

type Status = "todo" | "in-progress" | "done"

const workspaceStatus = ["todo", "in-progress", "done"]

export default function WorkspaceList({
  workspaces
}: Props) {

  const filteredWorkspace = (status: Status) => {
    return workspaces.filter(workspace => workspace.status === status)
  }

  return (
    <div className="grid grid-cols-3 gap-5 mt-10">
      {workspaceStatus.map((status) => (
        <WorkspaceCard title={status} filteredWorkspace={filteredWorkspace(status as Status)} />
      ))}
    </div>
  )
}
