import { SignInButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"

export default function HomePage() {

  const { userId } = auth()

  if (userId) {
    return redirect("/board")
  }

  return (
    <main className="min-h-dvh p-24">
      <h1 className="mb-5 text-4xl font-bold">Task Manager</h1>
      <div>
        <SignInButton fallbackRedirectUrl="/board" mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
      </div>
    </main>
  );
}
