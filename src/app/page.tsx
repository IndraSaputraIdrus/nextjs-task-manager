import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react";
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-dvh p-24">
      <h1 className="mb-5 text-4xl font-bold">Task Manager</h1>
      <div className="">
        <Button asChild>
          <Link href="/board">
            Getting started <ArrowRight className="size-4 ml-3" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
