import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function NotFoundPage() {
  const { loggedIn } = useAuth()

  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>The page you are looking for does not exist.😵😵😵😵</p>
      <Link to={loggedIn ? '/dashboard' : '/login'}>Go home</Link>
    </div>
  )
}

