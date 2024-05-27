"use server"

import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod"
import { compareSync } from "bcrypt"
import { lucia } from "@/lib/auth"
import { cookies } from "next/headers";
import { redirect } from "next/navigation"

interface ActionResult {
  formError?: {
    username?: string[] | undefined,
    password?: string[] | undefined
  },
  error?: string;
}


const singInValidator = z.object({
  username: z.string().min(3).max(31),
  password: z.string().min(3).max(31)
})

export async function signIn(_: any, formData: FormData): Promise<ActionResult> {
  const valid = singInValidator.safeParse(Object.fromEntries(formData))

  if (valid.error) {
    return {
      formError: valid.error.flatten().fieldErrors
    }
  }

  const { data } = valid

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, data.username))
    .then(res => res[0])

  if (!existingUser) {
    return {
      error: "Incorrect username or password"
    }
  }

  const validPassword = compareSync(data.password, existingUser.hashedPassword)

  if (!validPassword) {
    return {
      error: "Incorrect username or password"
    }
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect("/board")
}
