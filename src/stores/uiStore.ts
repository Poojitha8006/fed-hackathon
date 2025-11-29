import { create } from 'zustand'

type Toast = { id: string; message: string; type: 'info' | 'success' | 'error' }

type State = {
  toasts: Toast[]
}

type Actions = {
  addToast: (t: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useUiStore = create<State & Actions>((set) => ({
  toasts: [],
  addToast: (t) => set((s) => ({ toasts: [...s.toasts, { ...t, id: Math.random().toString(36).slice(2) }] })),
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter(x => x.id !== id) }))
}))

