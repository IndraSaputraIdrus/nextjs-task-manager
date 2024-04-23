import type { Board } from '@/lib/schema'
import React from 'react'

type Props = {
  boards: Array<Board>
}

export default function BoardList({ boards }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {boards.map(board => (
        <div key={board.id} className="border p-2 rounded">{board.title}</div>
      ))}
    </div>
  )
}
