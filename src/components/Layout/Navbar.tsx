import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../hooks/useCart'
import { useTheme } from '../../context/ThemeContext'
import styles from './Navbar.module.css'

export function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/dashboard" className={styles.logo}>
          Meme Admin Panel (i hate react🤢)
        </Link>
        <nav className={styles.navLinks}>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
            Dashboard
          </NavLink>
          <NavLink to="/memes" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
            Memes
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
            Cart ({totalItems})
          </NavLink>
        </nav>
      </div>
      <div className={styles.right}>
        <button
          type="button"
          onClick={toggleTheme}
          className={styles.themeButton}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        {user && <span className={styles.username}>Hi, {user.username}</span>}
        <button type="button" onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </header>
  )
}
