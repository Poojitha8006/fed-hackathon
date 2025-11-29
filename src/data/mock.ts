import type { Professional, Service } from '../types/models'
import { uid } from '../utils/id'

const categories = ['Plumbing','Electrical','Tutoring','Photography','Cleaning','Gardening']

function makeServices(pid: string): Service[] {
  const titles = ['Basic','Standard','Premium']
  const cat = categories[Math.floor(Math.random()*categories.length)]
  return titles.map((t, i) => ({ id: uid(), professionalId: pid, title: `${cat} ${t}`, description: `${t} package`, category: cat, price: 50 + i*50, duration: 60 + i*30 }))
}

export function seedProfessionals(): Professional[] {
  const list: Professional[] = []
  for (let i=0;i<20;i++) {
    const id = uid()
    list.push({
      id,
      name: `Pro ${i+1}`,
      email: `pro${i+1}@example.com`,
      role: 'professional',
      avatar: `https://api.dicebear.com/9.x/initials/svg?seed=Pro${i+1}`,
      createdAt: new Date().toISOString(),
      bio: 'Experienced professional',
      skills: ['skill A','skill B','skill C'],
      experience: `${2 + (i%8)} years`,
      rating: Math.round((3 + Math.random()*2)*10)/10,
      reviewCount: 20 + i,
      services: makeServices(id),
      portfolio: [],
      availability: []
    })
  }
  return list
}

