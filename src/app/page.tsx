import { SignInButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function HomePage() {

  const { userId } = auth()

  if (userId) {
    return redirect("/board")
  }

  return (
    <main className="min-h-dvh p-24">
      <h1>task manager</h1>
      <div>
        <SignInButton fallbackRedirectUrl="/board" mode="modal" />
      </div>
    </main>
  );
}
