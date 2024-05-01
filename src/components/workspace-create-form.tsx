"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger
} from "@/components/ui/select"


import { createWorkspaceItem } from '@/actions/workspace'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { toast } from "./ui/use-toast"

function Submit() {
  const { pending } = useFormStatus()

  return <Button className="ml-auto" disabled={pending} type="submit">{pending ? "loading" : "submit"}</Button>
}

type Props = {
  boardId: string
}

export default function WorkspaceCreateForm({ boardId }: Props) {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [_, createFormAction] = useFormState(createWorkspaceItem, null)

  const action = async (data: FormData) => {
    formRef.current?.reset()
    let message: string = ""
    createFormAction(data)
    message = "Create success"
    setOpen(false)
    toast({
      title: message,
      className: "bg-primary text-primary-foreground"
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={buttonVariants({ variant: "default" })}>Create new item</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-3xl mb-5">Create new item</SheetTitle>
          <form ref={formRef} className="space-y-4 max-w-lg" action={action}>
            <input type="hidden" name="boardId" value={boardId} />
            <Input placeholder="Enter title" type="text" name="title" />
            <Select name="status">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
            <Submit />
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
