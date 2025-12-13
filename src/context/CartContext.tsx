import { createContext, useContext, useMemo } from 'react'
import type { Meme } from '../types/meme'
import { useLocalStorage } from '../hooks/useLocalStorage'

export interface CartItem {
  meme: Meme
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (meme: Meme) => void
  removeItem: (id: string) => void
  decreaseCount: (id: string) => void
  clearCart: () => void
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const CART_STORAGE_KEY = 'meme_marketplace_cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems, removeItems] = useLocalStorage<CartItem[]>(CART_STORAGE_KEY, [])

  const addItem = (meme: Meme) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.meme.id === meme.id)
      if (existing) {
        return prev.map((item) =>
          item.meme.id === meme.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { meme, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.meme.id !== id))
  }

  const decreaseCount = (id: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.meme.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => {
    removeItems()
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.meme.rating * 25 * item.quantity, 0)
  }

  const value = useMemo<CartContextValue>(
    () => ({ items, addItem, removeItem, decreaseCount, clearCart, getTotalPrice }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider')
  }
  return context
}

