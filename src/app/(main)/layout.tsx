import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import MainHeader from "@/components/main-header"

type Props = {
  children: React.ReactNode
}

export default function LayoutGroupMain({ children }: Props) {
  const { userId } = auth()
  if (!userId) return redirect("/")

  return (
    <>
      <MainHeader />
      {children}
    </>

  )
}
