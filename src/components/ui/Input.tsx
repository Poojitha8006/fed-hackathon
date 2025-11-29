type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }
export function Input({ label, error, ...props }: Props) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm text-gray-700">{label}</label>}
      <input className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" {...props} />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

