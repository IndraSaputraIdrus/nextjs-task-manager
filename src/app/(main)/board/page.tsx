import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { getBoards } from "@/services/boardService";

export default async function BoardPage() {
  const boards = await getBoards()
  return (
    <div className="p-10 space-y-5">
      <SignOutButton redirectUrl="/">
        <Button>Sign Out</Button>
      </SignOutButton>
      <div>
        {boards?.map(board => (
          <div key={board.id}>{board.title} - {board.createdAt}</div>
        ))}
      </div>
    </div>
  )
}
