import MainHeader from "@/components/main-header"
import { validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"

type Props = {
  children: React.ReactNode
}

export default async function LayoutGroupMain({ children }: Props) {
  const { user } = await validateRequest()

  if (!user) {
    return redirect("/sign-in")
  }

  return (
    <>
      <MainHeader />
      {children}
    </>
  )
}
