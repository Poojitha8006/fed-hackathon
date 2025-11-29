import { Link } from 'react-router-dom'
import { useDataStore } from '../stores/dataStore'
import { Card } from '../components/ui/Card'
import { Avatar } from '../components/ui/Avatar'

export default function LandingPage() {
  const professionals = useDataStore(s => s.professionals.slice(0,6))
  const categories = useDataStore(s => s.categories)
  return (
    <div>
      <section className="bg-primary-600 text-white">
        <div className="container-default py-16">
          <h1 className="text-3xl font-semibold">Find trusted professionals</h1>
          <p className="mt-2">Hire experts across categories for your next job</p>
          <div className="mt-6">
            <Link to="/search" className="inline-block rounded-md bg-white text-primary-700 px-4 py-2">Browse</Link>
          </div>
        </div>
      </section>
      <section className="container-default py-10">
        <h2 className="text-xl font-semibold">Featured professionals</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {professionals.map(p => (
            <Card key={p.id}>
              <div className="p-4 flex items-center gap-3">
                <Avatar src={p.avatar} alt={p.name} />
                <div className="flex-1">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-600">{p.services[0]?.category}</div>
                </div>
                <Link to={`/professional/${p.id}`} className="text-primary-600">View</Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <section className="container-default py-10">
        <h2 className="text-xl font-semibold">Categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map(c => (
            <Link key={c.id} to={`/search?category=${encodeURIComponent(c.name)}`} className="rounded-full bg-gray-100 px-3 py-1 text-sm">{c.name}</Link>
          ))}
        </div>
      </section>
    </div>
  )
}

