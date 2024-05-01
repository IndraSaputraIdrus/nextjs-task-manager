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


import { createWorkspaceItem, updateWorkspaceItemAction } from '@/actions/workspace'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { toast } from "./ui/use-toast"
import { useWorkspaceStore } from "@/stores/workspace"

function Submit() {
  const { pending } = useFormStatus()

  return <Button className="ml-auto" disabled={pending} type="submit">{pending ? "loading" : "submit"}</Button>
}

type Props = {
  boardId: string
}

export default function WorkspaceUpdateForm({ boardId }: Props) {
  const [open, setOpen] = useWorkspaceStore(state => ([state.open, state.setOpen]))
  const [data, setData] = useWorkspaceStore(state => ([state.data, state.setData]))
  const formRef = useRef<HTMLFormElement>(null)
  const [_, updateFormAction] = useFormState(updateWorkspaceItemAction, null)
  console.log(data)

  const [title, setTitle] = useState("")
  const [id, setId] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setId(data.id)
      setStatus(data.status)
    }
  }, [data])

  const action = async (data: FormData) => {
    formRef.current?.reset()
    let message: string = ""
    updateFormAction(data)
    message = "update success"
    setOpen(false)
    toast({
      title: message,
      className: "bg-primary text-primary-foreground"
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-3xl mb-5">Update item</SheetTitle>
          <form ref={formRef} className="space-y-4 max-w-lg" action={action}>
            <input type="hidden" name="boardId" value={boardId} />
            <input type="hidden" name="id" value={id} />
            <Input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter title" type="text" name="title" />
            <Select value={status} name="status">
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
            <form>
              <Button variant="destructive">Delete</Button>
            </form>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
