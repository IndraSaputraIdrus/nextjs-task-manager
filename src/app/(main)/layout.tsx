import MainHeader from "@/components/main-header"

type Props = {
  children: React.ReactNode
}

export default function LayoutGroupMain({ children }: Props) {
  return (
    <>
      <MainHeader />
      {children}
    </>

  )
}
