type Props = {
  params: {
    id: string
  }
}

export default async function WorkSpace({ params: { id } }: Props) {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Workspace - {id}</h1>
    </div>
  )
}
