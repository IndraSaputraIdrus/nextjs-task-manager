"use client"

import CreateBoardForm from "@/components/create-board-form"
import BoardList from "@/components/board-list"
import type { Board } from "@/lib/schema"
import { useOptimistic } from "react"

type Props = {
  boards: Array<Board>
}

export type Actions = "create"

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
