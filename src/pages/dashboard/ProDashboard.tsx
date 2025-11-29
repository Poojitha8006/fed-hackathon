import { useAuthStore } from '../../stores/authStore'
import { useDataStore } from '../../stores/dataStore'
import { useState } from 'react'

export default function ProDashboard() {
  const user = useAuthStore(s => s.user)!
  const pro = useDataStore(s => s.professionals.find(p => p.email === user.email))
  const addService = useDataStore(s => s.addService)
  const updateProfessional = useDataStore(s => s.updateProfessional)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(50)
  const [category, setCategory] = useState('General')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [image, setImage] = useState<File | null>(null)
  if (!pro) return <div className="container-default py-8">Profile not found</div>
  return (
    <div className="container-default py-8">
      <h1 className="text-2xl font-semibold">Services</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {pro.services.map(s => (
          <div key={s.id} className="rounded-lg border bg-white p-4">
            <div className="font-medium">{s.title}</div>
            <div className="text-sm text-gray-600">${s.price} · {s.duration} mins</div>
          </div>
        ))}
      </div>
      <div className="mt-8 max-w-md">
        <h2 className="text-lg font-semibold">Add service</h2>
        <div className="space-y-3 mt-3">
          <input className="w-full rounded-md border px-3 py-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <input type="number" className="w-full rounded-md border px-3 py-2" placeholder="Price" value={price} onChange={e=>setPrice(Number(e.target.value))} />
          <input className="w-full rounded-md border px-3 py-2" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
          <button className="rounded-md bg-primary-600 text-white px-4 py-2" onClick={()=>{ addService(pro.id, { title, description: 'New service', category, price, duration: 60 }); setTitle('') }}>Add</button>
        </div>
      </div>
      <div className="mt-10 max-w-md">
        <h2 className="text-lg font-semibold">Availability</h2>
        <div className="space-y-3 mt-3">
          <input type="date" className="w-full rounded-md border px-3 py-2" value={date} onChange={e=>setDate(e.target.value)} />
          <input type="time" className="w-full rounded-md border px-3 py-2" value={time} onChange={e=>setTime(e.target.value)} />
          <button className="rounded-md bg-primary-600 text-white px-4 py-2" onClick={()=>{
            if (!date || !time) return
            const slots = pro.availability.find(a => a.date === date)?.slots || []
            const nextAvail = pro.availability.filter(a => a.date !== date).concat({ date, slots: [...slots, time] })
            updateProfessional(pro.id, { availability: nextAvail })
            setDate(''); setTime('')
          }}>Add slot</button>
        </div>
      </div>
      <div className="mt-10 max-w-md">
        <h2 className="text-lg font-semibold">Portfolio</h2>
        <div className="space-y-3 mt-3">
          <input type="file" onChange={e=>setImage(e.target.files?.[0] || null)} />
          <button className="rounded-md bg-primary-600 text-white px-4 py-2" onClick={()=>{
            if (!image) return
            const url = URL.createObjectURL(image)
            updateProfessional(pro.id, { portfolio: [...pro.portfolio, url] })
            setImage(null)
          }}>Upload image</button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {pro.portfolio.map((src, i) => (
            <img key={i} src={src} className="w-full h-24 object-cover rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
