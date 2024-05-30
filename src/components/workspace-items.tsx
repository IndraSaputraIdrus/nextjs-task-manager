import { Workspace } from "@/lib/db/schema"

type Props = {
  workspaces: Array<Workspace>
}

export const WorkspaceItems = ({ workspaces }: Props) => {

  const todo = workspaces.filter(item => item.status === "todo")
  const inProgress = workspaces.filter(item => item.status === "in-progress")
  const done = workspaces.filter(item => item.status === "done")

  const status = [
    { name: "todo", items: todo },
    { name: "in progress", items: inProgress },
    { name: "done", items: done }
  ]

  return (
    <div className="flex items-start gap-5">
      {status.map((object) => (
        <div className="border border-zinc-800 rounded p-3 w-1/3">
          <h2 className="mb-5 text-2xl font-semibold capitalize border-b border-zinc-800 pb-2">{object.name}</h2>
          <ul className="space-y-2">
            {object.items.map((item) => (
              <p className="capitalize">{item.title}</p>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
