"use client"

import { signUp } from "@/actions/auth/signup"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useFormState } from "react-dom"
import Link from "next/link"
import { useEffect } from "react"

export default function Page() {
  const [state, formAction] = useFormState(signUp, {})

  return (
    <main className="min-h-dvh p-24">
      <h1 className="text-4xl font-semibold mb-7 text-center">Sign up</h1>
      <form className="space-y-4 max-w-lg mx-auto" action={formAction}>
        {state.error ? (
          <div className="bg-pink-300 text-pink-700 p-3 rounded">
            <p>{state.error}</p>
          </div>
        ) : null}

        <div className="space-y-1">
          <label htmlFor="username">Username</label>
          <Input name="username" id="username" />
          {state.formError?.username ? (<p className="text-sm text-pink-500 italic">{state.formError.username}</p>) : null}
        </div>
        <div className="space-y-1">
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" id="password" />
          {state.formError?.username ? (<p className="text-sm text-pink-500 italic">{state.formError.username}</p>) : null}
        </div>
        <div className="space-y-1">
          <label htmlFor="confimPassword">Confirm Password</label>
          <Input type="password" name="confirmPassword" id="confirmPassword" />
          {state.formError?.confirmPassword ? (<p className="text-sm text-pink-500 italic">{state.formError.confirmPassword}</p>) : null}
        </div>
        <Button>Submit</Button>
      </form>

      <p className="text-center mt-5">Already have an account? <Link className="text-indigo-500 hover:text-indigo-300" href="/sign-in">Sign in</Link></p>
    </main>
  );
}

