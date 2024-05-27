"use server"

import { z } from "zod";
import { hashSync } from "bcrypt"
import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

interface ActionResult {
  success?: string;
  error?: any;
}

const singUpValidator = z.object({
  username: z.string().min(3).max(31),
  password: z.string().min(3).max(31)
})

export async function signUp(_: any, formData: FormData): Promise<ActionResult> {
  const valid = singUpValidator.safeParse(Object.fromEntries(formData))

  if (valid.error) {
    return { error: valid.error.flatten().fieldErrors }
  }

  const data = valid.data

  const existUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, data.username))
    .then(res => res[0])

  if (existUser) {
    return { error: "User already exist" }
  }

  const hashedPassword = hashSync(data.password, 10)

  const user = await db
    .insert(usersTable)
    .values({
      username: data.username,
      hashedPassword
    })
    .returning({ id: usersTable.id })
    .then(res => res[0])

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return redirect("/board")
}
