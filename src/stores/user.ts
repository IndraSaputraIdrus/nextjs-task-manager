import { create } from "zustand";
import { User } from "lucia"

type Store = {
  id: string | null,
  setId: (id: string) => void
}

export const useUser = create<Store>()(set => ({
  id: null,
  setId: (id) => set({ id })
})) 
