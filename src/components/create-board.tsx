"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button, buttonVariants } from "@/components/ui/button"
import { useFormState, useFormStatus } from "react-dom";
import { Plus } from "lucide-react"
import { createBoard } from "@/actions/board"
import { useUser } from "@/stores/user"


const Submit = () => {
  const { pending } = useFormStatus()

  return <Button className="ml-auto" disabled={pending} type="submit">{pending ? "loading" : "submit"}</Button>
}

export const CreateBoard = () => {
  const [state, formAction] = useFormState(createBoard, { error: null })
  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: "default", size: "icon" })}><Plus /></SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-3xl mb-5">Create new board</SheetTitle>
          <form action={formAction} className="max-w-lg space-y-4 flex flex-col">
            <Input name="title" type="text" placeholder="Title" />
            <Textarea name="description" placeholder="Description" />
            <Input name="userId" type="text" placeholder="Title" />
            <Submit />
          </form>
        </SheetHeader>
        <div>
          {JSON.stringify(state, null, 2)}
        </div>
      </SheetContent>
    </Sheet>
  )

}
