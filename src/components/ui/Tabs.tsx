export function Tabs({ tabs, value, onChange }: { tabs: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-2 border-b">
      {tabs.map(t => (
        <button key={t} onClick={() => onChange(t)} className={value === t ? 'px-3 py-2 border-b-2 border-primary-600 text-primary-600' : 'px-3 py-2 text-gray-600'}>{t}</button>
      ))}
    </div>
  )
}

