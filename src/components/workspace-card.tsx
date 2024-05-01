"use client"

import {
  Card,
  CardTitle,
  CardContent,
  CardHeader
} from "@/components/ui/card"
import { Workspace } from "@/lib/schema"
import { useWorkspaceStore } from "@/stores/workspace"

type Props = {
  title: string,
  filteredWorkspace: Array<Workspace>
}

export default function WorkspaceCard({
  title, filteredWorkspace
}: Props) {
  const [setOpen, setData] = useWorkspaceStore(state => ([state.setOpen, state.setData]))

  const handleUpdate = (data: Workspace) => {
    setData(data)
    setOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{title.replace("-", " ")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {filteredWorkspace.map(item => (
            <li onClick={() => handleUpdate(item)} className="hover:opacity-70 cursor-pointer font-semibold text-lg border border-border rounded px-3 py-2">{item.title}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
