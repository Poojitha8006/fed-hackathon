export type Role = 'admin' | 'professional' | 'user' | 'support'

export type User = {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  createdAt: string
}

export type Professional = User & {
  bio?: string
  skills: string[]
  experience?: string
  rating: number
  reviewCount: number
  services: Service[]
  portfolio: string[]
  availability: Array<{ date: string; slots: string[] }>
}

export type Service = {
  id: string
  professionalId: string
  title: string
  description: string
  category: string
  price: number
  duration: number
}

export type BookingStatus = 'pending' | 'accepted' | 'completed' | 'cancelled'

export type Booking = {
  id: string
  userId: string
  professionalId: string
  serviceId: string
  date: string
  status: BookingStatus
  amount: number
  requirements?: string
}

export type Review = {
  id: string
  bookingId: string
  rating: number
  comment?: string
  createdAt: string
}

export type Category = {
  id: string
  name: string
}

export type PlatformSettings = {
  commissionRate: number
  approvalRequired: boolean
}

