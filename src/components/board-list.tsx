import { boards } from '@/lib/schema'
import { InferInsertModel } from 'drizzle-orm'
import React from 'react'

type Props = {
  boards: InferInsertModel<typeof boards>[] | undefined
}

export default function BoardList({ boards }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {boards?.map(board => (
        <div key={board.id} className="border p-2 rounded">{board.title}</div>
      ))}
    </div>
  )
}
