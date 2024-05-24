import { getBoards } from "@/services/boardService";
import Boards from "@/components/boards"

export default async function BoardPage() {
  // const boards = await getBoards()
  const boards = []
  return (
    <div className="p-10 space-y-5">
      <h1 className="text-4xl font-semibold">List board</h1>
      <Boards boards={boards} />
    </div>
  )
}
