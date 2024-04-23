import createBoard from "@/actions/createBoard";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { BoardOptimisticUpdate } from "./boards";
import { useToast } from "@/components/ui/use-toast"

type Props = {
  optimisticBoardsUpdate: BoardOptimisticUpdate
}

function Submit() {
  const { pending } = useFormStatus()

  return <Button disabled={pending} type="submit">{pending ? "loading" : "submit"}</Button>
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
    <form ref={formRef} action={action} className="max-w-lg space-y-4">
      <Input name="title" type="text" placeholder="Enter new board title" />
      <Textarea name="description" placeholder="Enter new board Description" />
      <Submit />
    </form>
  )
}
