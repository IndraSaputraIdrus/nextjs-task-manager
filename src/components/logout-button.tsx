"use client"

import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { useFormStatus } from "react-dom"
import { logout } from "@/actions/auth/logout"

function Logout() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>
      {pending ? <Loader2 className="size-4 mr-2 animate-spin" /> : null}
      Logout
    </Button>
  )
}

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Logout />
    </form>
  )
}
