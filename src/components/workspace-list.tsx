"use client"

import { Workspace } from "@/lib/schema"

type Props = {
  workspaces: Array<Workspace>
}

export default function WorkspaceList({
  workspaces
}: Props) {

  const filteredWorkspace = (status: "todo" | "in-progress" | "done") => {
    return workspaces.filter(workspace => workspace.status === status)
  }

  return (
    <div className="grid grid-cols-3 gap-5 mt-10">
      <div className="border p-3">
        <h2>Todo</h2>
        {filteredWorkspace("todo").map(item => (
          <div>{item.title}</div>
        ))}
      </div>
      <div className="border p-3">
        <h2>In progress</h2>
        {filteredWorkspace("in-progress").map(item => (
          <div>{item.title}</div>
        ))}
      </div>
      <div className="border p-3">
        <h2>Done</h2>
        {filteredWorkspace("done").map(item => (
          <div>{item.title}</div>
        ))}
      </div>
    </div>
  )
}
