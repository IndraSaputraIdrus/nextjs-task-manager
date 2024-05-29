"use client"

import { signIn } from "@/actions/auth/signin"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useFormState } from "react-dom"
import Link from "next/link"

export default function SignInPage() {

  const [state, formAction] = useFormState(signIn, {})

  return (
    <main className="min-h-dvh p-24">
      <h1 className="text-4xl font-semibold mb-7 text-center">Sign in</h1>

      <form className="space-y-4 max-w-lg mx-auto" action={formAction}>
        {state.error ? (
          <div className="bg-pink-300 text-pink-700 p-3 rounded">
            <p>{state.error}</p>
          </div>
        ) : null}

        <div>
          <label htmlFor="username">Username</label>
          <Input name="username" id="username" />
          {state.formError?.username ? (<p className="text-sm mt-1 text-pink-500 italic">{state.formError.username}</p>) : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" id="password" />
          {state.formError?.password ? (<p className="text-sm mt-1 text-pink-500 italic">{state.formError.password}</p>) : null}
        </div>
        <Button>Submit</Button>
      </form>
      <p className="text-center mt-5">Don't have an account? <Link className="text-indigo-500 hover:text-indigo-300" href="/sign-up">Sign up</Link></p>
    </main>
  );
}

