import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-dvh p-24">
      <h1 className="mb-5 text-4xl font-bold">Task Manager</h1>
      <div>
        <Button asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </main>
  );
}
