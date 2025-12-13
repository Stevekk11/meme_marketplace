import { useMemo } from 'react'
import { useCartContext } from '../context/CartContext'

export function useCart() {
  const { items, addItem, removeItem, decreaseCount, clearCart, getTotalPrice } =
    useCartContext()

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const totalPrice = useMemo(() => getTotalPrice(), [getTotalPrice])

  return { items, addItem, removeItem, decreaseCount, clearCart, getTotalPrice, totalItems, totalPrice }
}

