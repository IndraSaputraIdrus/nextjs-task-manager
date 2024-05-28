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
import { useState } from "react"


const Submit = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const { pending } = useFormStatus()

  return <Button onClick={() => {
    if(!pending) setOpen(false)
  }} className="ml-auto" disabled={pending} type="submit">{pending ? "loading" : "submit"}</Button>
}

export const CreateBoard = () => {
  const [state, formAction] = useFormState(createBoard, { error: null })
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={buttonVariants({ variant: "default", size: "icon" })}><Plus /></SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-3xl mb-5">Create new board</SheetTitle>
          <form action={formAction} className="max-w-lg space-y-4 flex flex-col">
            <Input name="title" type="text" placeholder="Title" />
            <Textarea name="description" placeholder="Description" />
            <Submit setOpen={setOpen} />
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )

}
