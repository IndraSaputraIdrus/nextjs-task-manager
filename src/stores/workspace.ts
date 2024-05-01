import { create } from "zustand"

type FormValue = {
  id: string
  title: string
  status: string
}

type Store = {
  data: FormValue | null
  open: boolean
  setOpen: (val: boolean) => void
  setData: (val: FormValue) => void
}

export const useWorkspaceStore = create<Store>()((set) => ({
  data: null,
  open: false,
  setOpen: (val) => set({ open: val }),
  setData: (val) => set({
    data: val
  })
}))
