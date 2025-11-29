import { useParams, useNavigate } from 'react-router-dom'
import { useDataStore } from '../stores/dataStore'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../stores/authStore'
import { useUiStore } from '../stores/uiStore'

const schema = z.object({ serviceId: z.string(), date: z.string(), time: z.string(), requirements: z.string().optional() })
type FormValues = z.infer<typeof schema>

export default function BookingPage() {
  const { professionalId } = useParams()
  const navigate = useNavigate()
  const pro = useDataStore(s => s.professionals.find(p => p.id === professionalId))
  const addBooking = useDataStore(s => s.addBooking)
  const user = useAuthStore(s => s.user)
  const toast = useUiStore(s => s.addToast)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) })
  if (!pro) return <div className="container-default py-8">Not found</div>
  const onSubmit = (v: FormValues) => {
    if (!user) { toast({ type: 'error', message: 'Login required' }); return }
    const when = `${v.date}T${v.time}:00`
    addBooking({ userId: user.id, professionalId: pro.id, serviceId: v.serviceId, date: when, amount: pro.services.find(s => s.id === v.serviceId)?.price || 0, requirements: v.requirements })
    toast({ type: 'success', message: 'Booking created' })
    navigate('/dashboard/user')
  }
  return (
    <div className="container-default py-8">
      <h1 className="text-2xl font-semibold">Book {pro.name}</h1>
      <form className="mt-6 space-y-4 max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm">Service</label>
          <select className="mt-1 w-full rounded-md border px-3 py-2" {...register('serviceId')}>
            <option value="">Select a service</option>
            {pro.services.map(s => <option key={s.id} value={s.id}>{s.title} - ${s.price}</option>)}
          </select>
          {errors.serviceId && <p className="text-xs text-red-600">Service required</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm">Date</label>
            <input type="date" className="mt-1 w-full rounded-md border px-3 py-2" {...register('date')} />
            {errors.date && <p className="text-xs text-red-600">Date required</p>}
          </div>
          <div>
            <label className="text-sm">Time</label>
            <input type="time" className="mt-1 w-full rounded-md border px-3 py-2" {...register('time')} />
            {errors.time && <p className="text-xs text-red-600">Time required</p>}
          </div>
        </div>
        <div>
          <label className="text-sm">Requirements</label>
          <textarea className="mt-1 w-full rounded-md border px-3 py-2" rows={4} {...register('requirements')} />
        </div>
        <button className="rounded-md bg-primary-600 text-white px-4 py-2">Confirm booking</button>
      </form>
    </div>
  )
}

