import { useState } from 'react'

type Ticket = { id: string; subject: string; status: 'open' | 'in_progress' | 'resolved'; userEmail: string }
type FAQ = { id: string; question: string; answer: string }

export default function SupportDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [subject, setSubject] = useState('')
  const [email, setEmail] = useState('')
  const addTicket = () => { if (!subject || !email) return; setTickets(t => [...t, { id: Math.random().toString(36).slice(2), subject, status: 'open', userEmail: email }]); setSubject(''); setEmail('') }
  const updateStatus = (id: string, status: Ticket['status']) => setTickets(ts => ts.map(t => t.id === id ? { ...t, status } : t))
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [q, setQ] = useState('')
  const [a, setA] = useState('')
  return (
    <div className="container-default py-8">
      <h1 className="text-2xl font-semibold">Support tickets</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets.map(t => (
          <div key={t.id} className="rounded-lg border bg-white p-4">
            <div className="font-medium">{t.subject}</div>
            <div className="text-sm text-gray-600">{t.userEmail}</div>
            <div className="mt-2 flex gap-2">
              <select value={t.status} onChange={e=>updateStatus(t.id, e.target.value as any)} className="rounded-md border px-2 py-1 text-sm">
                <option value="open">Open</option>
                <option value="in_progress">In progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 max-w-md">
        <h2 className="text-lg font-semibold">Add ticket</h2>
        <div className="space-y-3 mt-3">
          <input className="w-full rounded-md border px-3 py-2" placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)} />
          <input className="w-full rounded-md border px-3 py-2" placeholder="User email" value={email} onChange={e=>setEmail(e.target.value)} />
          <button className="rounded-md bg-primary-600 text-white px-4 py-2" onClick={addTicket}>Add</button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold">FAQs</h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map(f => (
            <div key={f.id} className="rounded-lg border bg-white p-4">
              <div className="font-medium">{f.question}</div>
              <div className="text-sm text-gray-700 mt-2">{f.answer}</div>
            </div>
          ))}
          {faqs.length === 0 && <div className="text-sm text-gray-600">No FAQs yet</div>}
        </div>
        <div className="mt-4 max-w-md space-y-3">
          <input className="w-full rounded-md border px-3 py-2" placeholder="Question" value={q} onChange={e=>setQ(e.target.value)} />
          <textarea className="w-full rounded-md border px-3 py-2" rows={4} placeholder="Answer" value={a} onChange={e=>setA(e.target.value)} />
          <button className="rounded-md bg-primary-600 text-white px-4 py-2" onClick={()=>{ if(q&&a){ setFaqs(f=>[...f,{ id: Math.random().toString(36).slice(2), question: q, answer: a }]); setQ(''); setA('') } }}>Add FAQ</button>
        </div>
      </div>
    </div>
  )
}
