import { useUiStore } from '../../stores/uiStore'

export function Toasts() {
  const toasts = useUiStore(s => s.toasts)
  const remove = useUiStore(s => s.removeToast)
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map(t => (
        <div key={t.id} className={`rounded-md px-4 py-2 shadow text-white ${t.type === 'error' ? 'bg-red-600' : t.type === 'success' ? 'bg-green-600' : 'bg-gray-800'}`}>
          <div className="flex items-center justify-between gap-4">
            <span>{t.message}</span>
            <button onClick={() => remove(t.id)} className="opacity-70 hover:opacity-100">×</button>
          </div>
        </div>
      ))}
    </div>
  )
}

