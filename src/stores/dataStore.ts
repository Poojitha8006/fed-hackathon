import { create } from 'zustand'
import type { Booking, Category, PlatformSettings, Professional, Review, Service, User } from '../types/models'
import { uid } from '../utils/id'
import { seedProfessionals } from '../data/mock'

type State = {
  users: User[]
  professionals: Professional[]
  categories: Category[]
  bookings: Booking[]
  reviews: Review[]
  settings: PlatformSettings
  favorites: Record<string, string[]>
}

type Actions = {
  ensureSeeded: () => void
  addCategory: (name: string) => void
  updateSettings: (s: Partial<PlatformSettings>) => void
  addUser: (u: User) => void
  updateUserRole: (userId: string, role: User['role']) => void
  suspendUser: (userId: string) => void
  deleteUser: (userId: string) => void
  addProfessional: (p: Professional) => void
  updateProfessional: (id: string, patch: Partial<Professional>) => void
  addService: (professionalId: string, s: Omit<Service, 'id' | 'professionalId'>) => void
  updateService: (serviceId: string, s: Partial<Service>) => void
  deleteService: (serviceId: string) => void
  addBooking: (b: Omit<Booking, 'id' | 'status'>) => Booking
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void
  addReview: (r: Omit<Review, 'id' | 'createdAt'>) => void
  toggleFavorite: (userId: string, proId: string) => void
}

const KEY = 'psm_data'

export const useDataStore = create<State & Actions>((set, get) => ({
  users: [],
  professionals: [],
  categories: [],
  bookings: [],
  reviews: [],
  settings: { commissionRate: 10, approvalRequired: true },
  favorites: {},
  ensureSeeded: () => {
    const raw = localStorage.getItem(KEY)
    if (raw) set(JSON.parse(raw))
    if (!raw) {
      const pros = seedProfessionals()
      const categories = Array.from(new Set(pros.flatMap(p => p.services.map(s => s.category)))).map((name) => ({ id: uid(), name }))
      const data = { users: [], professionals: pros, categories, bookings: [], reviews: [], settings: { commissionRate: 10, approvalRequired: true }, favorites: {} }
      localStorage.setItem(KEY, JSON.stringify(data))
      set(data)
    }
  },
  addCategory: (name) => set((s) => {
    const next = { ...s, categories: [...s.categories, { id: uid(), name }] }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  updateSettings: (conf) => set((s) => {
    const next = { ...s, settings: { ...s.settings, ...conf } }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  addUser: (u) => set((s) => {
    const next = { ...s, users: [...s.users, u] }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  updateUserRole: (userId, role) => set((s) => {
    const nextUsers = s.users.map(u => u.id === userId ? { ...u, role } : u)
    const next = { ...s, users: nextUsers }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  suspendUser: (userId) => set((s) => {
    const next = { ...s, users: s.users.filter(u => u.id !== userId) }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  deleteUser: (userId) => set((s) => {
    const next = { ...s, users: s.users.filter(u => u.id !== userId) }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  addProfessional: (p) => set((s) => {
    const next = { ...s, professionals: [...s.professionals, p] }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  updateProfessional: (id, patch) => set((s) => {
    const nextPros = s.professionals.map(p => p.id === id ? { ...p, ...patch } : p)
    const next = { ...s, professionals: nextPros }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  addService: (professionalId, sIn) => set((s) => {
    const service: Service = { id: uid(), professionalId, ...sIn }
    const nextPros = s.professionals.map(p => p.id === professionalId ? { ...p, services: [...p.services, service] } : p)
    const next = { ...s, professionals: nextPros }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  updateService: (serviceId, sIn) => set((s) => {
    const nextPros = s.professionals.map(p => ({ ...p, services: p.services.map(sv => sv.id === serviceId ? { ...sv, ...sIn } : sv) }))
    const next = { ...s, professionals: nextPros }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  deleteService: (serviceId) => set((s) => {
    const nextPros = s.professionals.map(p => ({ ...p, services: p.services.filter(sv => sv.id !== serviceId) }))
    const next = { ...s, professionals: nextPros }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  addBooking: (bIn) => {
    const b: Booking = { id: uid(), status: 'pending', ...bIn }
    const next = { ...get(), bookings: [...get().bookings, b] }
    localStorage.setItem(KEY, JSON.stringify(next))
    set(next)
    return b
  },
  updateBookingStatus: (id, status) => set((s) => {
    const next = { ...s, bookings: s.bookings.map(b => b.id === id ? { ...b, status } : b) }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  addReview: (rIn) => set((s) => {
    const r: Review = { id: uid(), createdAt: new Date().toISOString(), ...rIn }
    const next = { ...s, reviews: [...s.reviews, r] }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }),
  toggleFavorite: (userId, proId) => set((s) => {
    const favs = s.favorites[userId] || []
    const nextFavs = favs.includes(proId) ? favs.filter(id => id !== proId) : [...favs, proId]
    const next = { ...s, favorites: { ...s.favorites, [userId]: nextFavs } }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  })
}))
