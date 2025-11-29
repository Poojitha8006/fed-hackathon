import { useAuthStore } from '../stores/authStore'

export default function ProfileSettings() {
  const user = useAuthStore(s => s.user)
  if (!user) return null
  return (
    <div className="container-default py-8">
      <h1 className="text-2xl font-semibold">Profile settings</h1>
      <div className="mt-4 rounded-lg border bg-white p-4 max-w-md">
        <div className="text-sm text-gray-600">Name</div>
        <div className="font-medium">{user.name}</div>
        <div className="mt-2 text-sm text-gray-600">Email</div>
        <div className="font-medium">{user.email}</div>
      </div>
    </div>
  )
}

