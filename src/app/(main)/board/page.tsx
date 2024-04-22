import { getBoards } from "@/services/boardService";
import Boards from "@/components/boards"

export default async function BoardPage() {
  const boards = await getBoards()
  return (
    <div className="p-10 space-y-5">
      <Boards boards={boards ?? []} />
    </div>
  )
}
