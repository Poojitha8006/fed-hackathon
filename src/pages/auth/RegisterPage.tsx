import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6), role: z.enum(['admin','professional','user','support']) })
type FormValues = z.infer<typeof schema>

export default function RegisterPage() {
  const registerUser = useAuthStore(s => s.register)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) })
  const onSubmit = (v: FormValues) => { registerUser(v.name, v.email, v.role); navigate('/dashboard') }
  return (
    <div className="container-default py-10 max-w-md">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm">Name</label>
          <input className="w-full rounded-md border px-3 py-2" {...register('name')} />
          {errors.name && <p className="text-xs text-red-600">Name required</p>}
        </div>
        <div>
          <label className="text-sm">Email</label>
          <input className="w-full rounded-md border px-3 py-2" {...register('email')} />
          {errors.email && <p className="text-xs text-red-600">Invalid email</p>}
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input type="password" className="w-full rounded-md border px-3 py-2" {...register('password')} />
          {errors.password && <p className="text-xs text-red-600">Min 6 characters</p>}
        </div>
        <div>
          <label className="text-sm">Role</label>
          <select className="w-full rounded-md border px-3 py-2" {...register('role')}>
            <option value="user">User</option>
            <option value="professional">Professional</option>
            <option value="admin">Admin</option>
            <option value="support">Support</option>
          </select>
        </div>
        <button className="rounded-md bg-primary-600 text-white px-4 py-2">Create account</button>
      </form>
    </div>
  )
}

