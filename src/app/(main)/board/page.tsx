import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { getBoards } from "@/services/boardService";
import CreateBoardForm from "@/components/create-board-form"
import BoardList from "@/components/board-list"

export default async function BoardPage() {
  const boards = await getBoards()
  return (
    <div className="p-10 space-y-5">
      <SignOutButton redirectUrl="/">
        <Button>Sign Out</Button>
      </SignOutButton>

      <CreateBoardForm />
      <BoardList boards={boards} />
    </div>
  )
}
