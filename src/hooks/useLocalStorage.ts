import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (e) {
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (e) {
      // ignore
    }
  }, [key, storedValue])

  const remove = () => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (e) {
      // ignore
    }
  }

  return [storedValue, setStoredValue, remove] as const
}
