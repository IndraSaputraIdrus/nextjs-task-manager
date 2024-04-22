"use client"

import CreateBoardForm from "@/components/create-board-form"
import BoardList from "@/components/board-list"
import { InferSelectModel } from "drizzle-orm"
import { boards } from "@/lib/schema"
import { useOptimistic } from "react"

type Props = {
  boards: Array<InferSelectModel<typeof boards>>
}

export type Actions = "create"

type Board = InferSelectModel<typeof boards>

export function boardReducer(
  state: Array<Board>,
  { action, board }: { action: Actions, board: Board }
) {
  switch (action) {
    case "create":
      return [...state, board]
    default:
      return state
  }
}

export type BoardOptimisticUpdate = (action: {
  action: Actions,
  board: Board
}) => void

export default function Boards({ boards }: Props) {
  const [optimisticBoards, optimisticBoardsUpdate] = useOptimistic(boards, boardReducer)

  return (
    <>
      <CreateBoardForm optimisticBoardsUpdate={optimisticBoardsUpdate} />
      <BoardList boards={optimisticBoards} />
    </>
  )
}
