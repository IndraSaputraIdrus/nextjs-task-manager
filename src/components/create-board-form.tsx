"use client"

import createBoard from "@/actions/createBoard";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useFormState, useFormStatus } from "react-dom";
import { useRef } from "react";

function Submit() {
  const { pending } = useFormStatus()

  return <Button disabled={pending} type="submit">{pending ? "loading" : "submit"}</Button>
}

const initialState: {
  message: null | string
} = {
  message: null
}


export default function CreateBoardForm() {
  const [state, formAction] = useFormState(createBoard, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={(data) => {
      formRef.current?.reset()
      formAction(data)
    }} className="max-w-lg space-y-4">
      {state.message &&
        <p>{state.message}</p>
      }
      <Input name="title" type="text" placeholder="Enter new board title" />
      <Textarea name="description" placeholder="Enter new board Description" />
      <Submit />
    </form>
  )
}
