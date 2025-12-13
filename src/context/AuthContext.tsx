import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { AuthState, User } from '../types/auth'

interface AuthContextValue extends AuthState {
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const AUTH_STORAGE_KEY = 'meme_marketplace_auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth, removeAuth] = useLocalStorage<AuthState>(AUTH_STORAGE_KEY, {
    user: null,
    loggedIn: false,
  })

  const login = async (username: string, password: string) => {
    const trimmedUsername = username.trim()
    if (trimmedUsername.length < 3) {
      throw new Error('Username must be at least 3 characters')
    }
    if (password.length < 5) {
      throw new Error('Password must be at least 5 characters')
    }

    const user: User = { username: trimmedUsername }

    setAuth({ user, loggedIn: true })
  }

  const logout = () => {
    removeAuth()
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      ...auth,
      login,
      logout,
    }),
    [auth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

