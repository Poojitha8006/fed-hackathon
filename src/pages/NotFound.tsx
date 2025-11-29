import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-default py-20 text-center">
      <h1 className="text-2xl font-semibold">404</h1>
      <p className="text-gray-600">Page not found</p>
      <div className="mt-4"><Link to="/" className="rounded-md bg-primary-600 text-white px-4 py-2">Go home</Link></div>
    </div>
  )
}

