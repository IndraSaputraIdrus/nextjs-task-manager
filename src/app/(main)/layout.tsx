import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

type Props = {
  children: React.ReactNode
}

export default function LayoutGroupMain({ children }: Props) {
  const { userId } = auth()
  if (!userId) return redirect("/")

  return children
}
