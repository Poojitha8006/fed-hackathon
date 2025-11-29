import { useParams, Link } from 'react-router-dom'
import { useDataStore } from '../stores/dataStore'
import { Badge } from '../components/ui/Badge'
import { useAuthStore } from '../stores/authStore'

export default function ProfessionalProfilePage() {
  const { id } = useParams()
  const pro = useDataStore(s => s.professionals.find(p => p.id === id))
  const user = useAuthStore(s => s.user)
  const toggleFavorite = useDataStore(s => s.toggleFavorite)
  const favs = useDataStore(s => s.favorites)
  if (!pro) return <div className="container-default py-8">Not found</div>
  const isFav = user ? (favs[user.id] || []).includes(pro.id) : false
  return (
    <div className="container-default py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={pro.avatar} className="w-32 h-32 rounded-lg object-cover" />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{pro.name}</h1>
          <div className="text-gray-600">Rating {pro.rating} · {pro.reviewCount} reviews</div>
          <p className="mt-3 text-gray-700">{pro.bio}</p>
          <div className="mt-3 flex gap-2 flex-wrap">
            {pro.skills.map(s => <Badge key={s} color="blue">{s}</Badge>)}
          </div>
          <div className="mt-6 flex gap-3">
            <Link to={`/booking/${pro.id}`} className="rounded-md bg-primary-600 text-white px-4 py-2">Book now</Link>
            {user?.role === 'user' && (
              <button className="rounded-md bg-gray-100 px-3" onClick={()=>toggleFavorite(user.id, pro.id)}>{isFav ? 'Unsave' : 'Save'}</button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Services</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {pro.services.map(s => (
            <div key={s.id} className="rounded-lg border bg-white p-4">
              <div className="font-medium">{s.title}</div>
              <div className="text-sm text-gray-600">{s.category}</div>
              <p className="mt-2 text-gray-700">{s.description}</p>
              <div className="mt-2">${s.price} · {s.duration} mins</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
