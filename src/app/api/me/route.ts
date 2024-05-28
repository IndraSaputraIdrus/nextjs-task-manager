import { validateRequest } from "@/lib/auth"
import { NextResponse } from "next/server"

export const GET = async () => {
  const { user } = await validateRequest()

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ user })
}
