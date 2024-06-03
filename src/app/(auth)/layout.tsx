import { validateRequest } from "@/lib/auth"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

type Props = {
  children: React.ReactNode
}


export const generateMetadata = async (): Promise<Metadata> => {
  const heads = headers()
  const path = heads.get('next-url')?.replace("/", "").replace("-", " ")

  return {
    title: `Task Manager | ${path}`
  }
}

export default async function AuthLayout({ children }: Props) {
  const { user } = await validateRequest()
  if (user) {
    return redirect("/")
  }

  return children
}
