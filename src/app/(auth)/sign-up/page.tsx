"use client"

import { signUp } from "@/actions/auth/signup"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useFormState } from "react-dom"
import { useEffect } from "react"

export default async function Page() {

  const [state, formAction] = useFormState(signUp, { error: null })

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <main className="min-h-dvh p-24">
      <h1 className="text-4xl font-semibold mb-7 text-center">Sign up</h1>
      <form className="space-y-4 max-w-lg mx-auto" action={formAction}>
        <div>
          <label htmlFor="username">Username</label>
          <Input name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" id="password" />
        </div>
        <Button>Continue</Button>
      </form>
    </main>
  );
}

