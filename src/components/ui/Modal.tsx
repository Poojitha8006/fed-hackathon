export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-4 max-w-lg w-full">
        <div>{children}</div>
        <div className="mt-4 text-right">
          <button className="px-3 py-1 rounded bg-gray-100" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

