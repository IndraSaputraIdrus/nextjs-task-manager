import {
  Card,
  CardTitle,
  CardContent,
  CardHeader
} from "@/components/ui/card"
import { Workspace } from "@/lib/schema"

type Props = {
  title: string,
  filteredWorkspace: Array<Workspace>
}

export default function WorkspaceCard({
  title, filteredWorkspace
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{title.replace("-", " ")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {filteredWorkspace.map(item => (
            <li className="font-semibold text-lg border border-border rounded px-3 py-2">{item.title}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
