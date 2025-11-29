import { useMemo, useState } from 'react'
import { useDataStore } from '../stores/dataStore'
import { Link, useSearchParams } from 'react-router-dom'
import { Input } from '../components/ui/Input'

function useDebounced<T>(value: T, delay: number) {
  const [v, setV] = useState(value)
  useMemo(() => {
    const t = setTimeout(() => setV(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return v
}

export default function SearchPage() {
  const pros = useDataStore(s => s.professionals)
  const categories = useDataStore(s => s.categories)
  const [params] = useSearchParams()
  const [q, setQ] = useState('')
  const dq = useDebounced(q, 300)
  const categoryParam = params.get('category') || ''
  const [category, setCategory] = useState(categoryParam)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState<'rating'|'price'|'reviews'>('rating')
  const filtered = pros.filter(p => {
    const inCat = category ? p.services.some(s => s.category === category) : true
    const text = `${p.name} ${p.bio} ${p.skills.join(' ')} ${p.services.map(s=>s.title).join(' ')}`.toLowerCase()
    const match = dq ? text.includes(dq.toLowerCase()) : true
    const priceOk = p.services.some(s => s.price >= minPrice && s.price <= maxPrice)
    const ratingOk = p.rating >= minRating
    return inCat && match && priceOk && ratingOk
  })
  const sorted = [...filtered].sort((a,b) => sort === 'rating' ? b.rating - a.rating : sort === 'reviews' ? b.reviewCount - a.reviewCount : (a.services[0]?.price || 0) - (b.services[0]?.price || 0))
  const [page, setPage] = useState(1)
  const pageSize = 9
  const totalPages = Math.max(1, Math.ceil(sorted.length/pageSize))
  const pageItems = sorted.slice((page-1)*pageSize, page*pageSize)
  return (
    <div className="container-default py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-3">
          <Input placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
          <div>
            <label className="text-sm">Category</label>
            <select className="mt-1 w-full rounded-md border px-3 py-2" value={category} onChange={e=>setCategory(e.target.value)}>
              <option value="">All</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm">Min price</label>
              <input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={minPrice} onChange={e=>setMinPrice(Number(e.target.value))} />
            </div>
            <div>
              <label className="text-sm">Max price</label>
              <input type="number" className="mt-1 w-full rounded-md border px-3 py-2" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))} />
            </div>
          </div>
          <div>
            <label className="text-sm">Min rating</label>
            <input type="number" min={0} max={5} step={0.1} className="mt-1 w-full rounded-md border px-3 py-2" value={minRating} onChange={e=>setMinRating(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm">Sort by</label>
            <select className="mt-1 w-full rounded-md border px-3 py-2" value={sort} onChange={e=>setSort(e.target.value as any)}>
              <option value="rating">Rating</option>
              <option value="reviews">Reviews</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div className="text-sm text-gray-600">{sorted.length} results</div>
        </div>
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pageItems.map(p => (
            <div key={p.id} className="rounded-lg border bg-white p-4">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-600">Rating {p.rating} · {p.reviewCount} reviews</div>
              <div className="mt-2 text-sm text-gray-700">{p.bio}</div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {p.services.slice(0,3).map(s => <span key={s.id} className="rounded-full bg-gray-100 px-2 py-1 text-xs">{s.title}</span>)}
              </div>
              <div className="mt-4 flex gap-3">
                <Link to={`/professional/${p.id}`} className="text-primary-600">Profile</Link>
                <Link to={`/booking/${p.id}`} className="text-primary-600">Book</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2">
        <button className="px-3 py-1 rounded bg-gray-100" disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <button className="px-3 py-1 rounded bg-gray-100" disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next</button>
      </div>
    </div>
  )
}
