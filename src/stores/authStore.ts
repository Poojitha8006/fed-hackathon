import { create } from 'zustand'
import type { Role, User } from '../types/models'
import { uid } from '../utils/id'

type State = {
  user: User | null
}

type Actions = {
  login: (email: string, role: Role, name?: string) => void
  register: (name: string, email: string, role: Role) => void
  logout: () => void
}

const KEY = 'psm_auth'

export const useAuthStore = create<State & Actions>((set) => ({
  user: JSON.parse(localStorage.getItem(KEY) || 'null'),
  login: (email, role, name) => set(() => {
    const u: User = { id: uid(), name: name || email.split('@')[0], email, role, createdAt: new Date().toISOString() }
    localStorage.setItem(KEY, JSON.stringify(u))
    return { user: u }
  }),
  register: (name, email, role) => set(() => {
    const u: User = { id: uid(), name, email, role, createdAt: new Date().toISOString() }
    localStorage.setItem(KEY, JSON.stringify(u))
    return { user: u }
  }),
  logout: () => set(() => { localStorage.removeItem(KEY); return { user: null } })
}))

