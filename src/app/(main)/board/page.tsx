import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"

export default function BoardPage() {
  return (
    <div className="p-10">
      <SignOutButton redirectUrl="/">
        <Button>Sing Out</Button>
      </SignOutButton>
    </div>
  )
}
