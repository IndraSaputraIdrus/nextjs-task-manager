import { Workspace } from "@/lib/db/schema"
import { create } from "zustand"

type Store = {
  data: Workspace | undefined
  open: boolean
  setOpen: (value: boolean) => void
  setData: (value: Workspace | undefined) => void
}

export const useWorkspaceStore = create<Store>()((set) => ({
  data: undefined,
  open: false,
  setOpen: (value) => set({ open: value}),
  setData: (value) => set({
    data: value
  })
}))
