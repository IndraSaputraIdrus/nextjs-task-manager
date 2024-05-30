"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { useFormState, useFormStatus } from "react-dom";
import { Plus } from "lucide-react"
import { createWorkspaceItem, updateWorkspaceItem } from "@/actions/workspace"
import { useWorkspaceStore } from "@/stores/workspace";
import { useEffect } from "react";
import { sleep } from "@/lib/utils";

const Submit = ({ setOpen, open }: { setOpen: (open: boolean) => void, open: boolean }) => {
  const { pending } = useFormStatus()

  const handleClick = () => {
    if (!pending && open === true) setOpen(false)
  }

  return <Button onClick={handleClick} className="ml-auto" disabled={pending} type="submit">{pending ? "loading" : "submit"}</Button>
}

type CreateWorkspaceProps = {
  boardId: string
}

export const WorkspaceForm = ({ boardId }: CreateWorkspaceProps) => {
  const { open, setOpen, data, setData } = useWorkspaceStore()
  const [stateCreate, createAction] = useFormState(createWorkspaceItem, { error: null })
  const [stateUpdate, updateAction] = useFormState(updateWorkspaceItem, { error: null })

  useEffect(() => {
    if (!open) {
      sleep(1000).then(() => setData(undefined))
    }
  }, [open])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={buttonVariants({ variant: "default", size: "icon" })}><Plus /></SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-3xl mb-5">{data ? "Update task" : "Create new task"}</SheetTitle>
          <form action={data ? updateAction : createAction} className="max-w-lg space-y-4 flex flex-col">
            <Input defaultValue={data ? data.title : undefined} name="title" type="text" placeholder="Title" />
            {data ? (<input name="id" type="hidden" value={data.id} />) : null}
            <input name="boardId" type="hidden" value={boardId} />
            <Submit setOpen={setOpen} open={open} />
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )

}
