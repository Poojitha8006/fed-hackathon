import { useAuthStore } from '../../stores/authStore'
import { useDataStore } from '../../stores/dataStore'
import { Badge } from '../../components/ui/Badge'
import { useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { useUiStore } from '../../stores/uiStore'

export default function UserDashboard() {
  const user = useAuthStore(s => s.user)!
  const bookings = useDataStore(s => s.bookings.filter(b => b.userId === user.id))
  const favIds = useDataStore(s => s.favorites[user.id] || [])
  const pros = useDataStore(s => s.professionals.filter(p => favIds.includes(p.id)))
  const addReview = useDataStore(s => s.addReview)
  const toast = useUiStore(s => s.addToast)
  const [open, setOpen] = useState<string | null>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  return (
    <div className="container-default py-8">
      <h1 className="text-2xl font-semibold">My bookings</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map(b => (
          <div key={b.id} className="rounded-lg border bg-white p-4">
            <div className="font-medium">{new Date(b.date).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Amount ${b.amount}</div>
            <div className="mt-2"><Badge color={b.status==='completed' ? 'green' : b.status==='cancelled' ? 'red' : b.status==='accepted' ? 'blue' : 'yellow'}>{b.status}</Badge></div>
            {b.status === 'completed' && (
              <div className="mt-3">
                <button className="rounded-md bg-gray-100 px-3 py-1 text-sm" onClick={()=>setOpen(b.id)}>Add review</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Favorites</h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {pros.map(p => (
            <div key={p.id} className="rounded-lg border bg-white p-4">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-600">Rating {p.rating}</div>
            </div>
          ))}
          {pros.length === 0 && <div className="text-sm text-gray-600">No favorites saved</div>}
        </div>
      </div>
      <Modal open={!!open} onClose={()=>setOpen(null)}>
        <div className="space-y-3">
          <div className="font-medium">Add your review</div>
          <div>
            <label className="text-sm">Rating</label>
            <input type="number" min={1} max={5} value={rating} onChange={e=>setRating(Number(e.target.value))} className="mt-1 w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="text-sm">Comment</label>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" rows={4} />
          </div>
          <div className="text-right">
            <button className="rounded-md bg-primary-600 text-white px-4 py-2" onClick={()=>{ if(open){ addReview({ bookingId: open, rating, comment }); setOpen(null); setComment(''); setRating(5); toast({ type: 'success', message: 'Review submitted' }) } }}>Submit</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
