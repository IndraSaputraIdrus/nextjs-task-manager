"use client"

import { ClerkLoading, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function MainHeader() {
  return (
    <header className="px-10 py-4 flex items-center">
      <Button className="ml-auto relative">
        <ClerkLoading>
          <Loader2 className="size-3 animate-spin absolute z-10" />
          <p className="opacity-0">Sign Out</p>
        </ClerkLoading>
        <SignOutButton redirectUrl="/">
          Sign Out
        </SignOutButton>
      </Button>
    </header>
  )
}
