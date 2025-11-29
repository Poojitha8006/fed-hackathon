import { useDataStore } from '../../stores/dataStore'
import { useState } from 'react'
import { uid } from '../../utils/id'

export default function AdminDashboard() {
  const users = useDataStore(s => s.users)
  const professionals = useDataStore(s => s.professionals)
  const categories = useDataStore(s => s.categories)
  const addCategory = useDataStore(s => s.addCategory)
  const settings = useDataStore(s => s.settings)
  const updateSettings = useDataStore(s => s.updateSettings)
  const addUser = useDataStore(s => s.addUser)
  const updateUserRole = useDataStore(s => s.updateUserRole)
  const deleteUser = useDataStore(s => s.deleteUser)
  const [catName, setCatName] = useState('')
  const [commission, setCommission] = useState(settings.commissionRate)
  const [approval, setApproval] = useState(settings.approvalRequired)
  return (
    <div className="container-default py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Users" value={users.length} />
          <Stat label="Professionals" value={professionals.length} />
          <Stat label="Categories" value={categories.length} />
          <Stat label="Revenue" value={`$${professionals.reduce((a,p)=>a+p.services.reduce((x,s)=>x+s.price,0),0)}`} />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">User management</h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          {users.map(u => (
            <div key={u.id} className="rounded-lg border bg-white p-4">
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-gray-600">{u.email}</div>
              <div className="mt-2 flex gap-2">
                <select value={u.role} onChange={e=>updateUserRole(u.id, e.target.value as any)} className="rounded-md border px-2 py-1 text-sm">
                  <option value="user">User</option>
                  <option value="professional">Professional</option>
                  <option value="admin">Admin</option>
                  <option value="support">Support</option>
                </select>
                <button className="rounded-md bg-red-600 text-white px-2 py-1 text-sm" onClick={()=>deleteUser(u.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button className="rounded-md bg-primary-600 text-white px-3 py-1 text-sm" onClick={()=>addUser({ id: uid(), name: 'New User', email: `user${users.length+1}@example.com`, role: 'user', createdAt: new Date().toISOString() })}>Add user</button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Service categories</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map(c => <span key={c.id} className="rounded-full bg-gray-100 px-3 py-1 text-sm">{c.name}</span>)}
        </div>
        <div className="mt-3 flex gap-2">
          <input className="rounded-md border px-3 py-2" placeholder="New category" value={catName} onChange={e=>setCatName(e.target.value)} />
          <button className="rounded-md bg-primary-600 text-white px-4" onClick={()=>{ if(catName.trim()) { addCategory(catName.trim()); setCatName('') } }}>Add</button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Platform settings</h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-xl">
          <div>
            <label className="text-sm">Commission rate %</label>
            <input type="number" className="w-full rounded-md border px-3 py-2" value={commission} onChange={e=>setCommission(Number(e.target.value))} />
          </div>
          <div className="flex items-end gap-2">
            <input type="checkbox" checked={approval} onChange={e=>setApproval(e.target.checked)} />
            <span>Approval required</span>
          </div>
          <div>
            <button className="rounded-md bg-primary-600 text-white px-4 py-2" onClick={()=>updateSettings({ commissionRate: commission, approvalRequired: approval })}>Save</button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Analytics</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(c => {
            const count = professionals.filter(p => p.services.some(s => s.category === c.name)).length
            const barWidth = Math.min(100, count * 5)
            return (
              <div key={c.id} className="rounded-lg border bg-white p-4">
                <div className="text-sm text-gray-600">{c.name}</div>
                <div className="mt-2 h-2 bg-gray-100 rounded">
                  <div style={{ width: barWidth + '%' }} className="h-2 rounded bg-primary-600"></div>
                </div>
                <div className="mt-2 text-sm">{count} professionals</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
