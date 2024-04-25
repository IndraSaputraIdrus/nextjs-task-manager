import createBoard from "@/actions/createBoard";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button, buttonVariants } from "@/components/ui/button"
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { BoardOptimisticUpdate } from "./boards";
import { useToast } from "@/components/ui/use-toast"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type Props = {
  optimisticBoardsUpdate: BoardOptimisticUpdate
}

function Submit() {
  const { pending } = useFormStatus()

  return <Button className="ml-auto" disabled={pending} type="submit">{pending ? "loading" : "submit"}</Button>
}

const initialState: {
  message: null | string
} = {
  message: null
}


export default function CreateBoardForm({
  optimisticBoardsUpdate
}: Props) {
  const [state, formAction] = useFormState(createBoard, initialState)
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  function action(data: FormData) {
    optimisticBoardsUpdate({
      action: "create",
      board: {
        id: "",
        userId: "",
        title: data.get("title") as string,
        description: data.get("description") as string,
        createdAt: "",
        updatedAt: ""
      }
    })
    formRef.current?.reset()
    setOpen(false)
    formAction(data)
  }

  useEffect(() => {
    if (state.message === "success") {
      toast({
        title: "Board created succesfully",
        className: "bg-primary text-primary-foreground"
      })
    } else if (state.message === "failed") {
      toast({
        variant: "destructive",
        title: "Faild to create board",
      })
    }
  }, [state])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={buttonVariants({ variant: "default" })}>Create new board</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-3xl mb-5">Create new board</SheetTitle>
          <form ref={formRef} action={action} className="max-w-lg space-y-4 flex flex-col">
            <Input name="title" type="text" placeholder="Enter new board title" />
            <Textarea name="description" placeholder="Enter new board Description" />
            <Submit />
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
