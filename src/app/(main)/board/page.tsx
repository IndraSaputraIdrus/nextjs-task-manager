import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { getBoards } from "@/services/boardService";
import Boards from "@/components/boards"

export default async function BoardPage() {
  const boards = await getBoards()
  return (
    <div className="p-10 space-y-5">
      <SignOutButton redirectUrl="/">
        <Button>Sign Out</Button>
      </SignOutButton>
      <Boards boards={boards ?? []} />
    </div>
  )
}
