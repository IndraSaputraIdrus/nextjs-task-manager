import { validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"

type Props = {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: Props) {
  const { user } = await validateRequest()
  if (user) {
    return redirect("/")
  }

  return children
}
