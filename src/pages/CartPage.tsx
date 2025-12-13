import { useCart } from '../hooks/useCart'
import styles from './CartPage.module.css'

export function CartPage() {
  const { items, addItem, decreaseCount, removeItem, clearCart, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1>Cart</h1>
      <div className={styles.layout}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.meme.id} className={styles.item}>
              <img src={item.meme.url} alt={item.meme.name} />
              <div className={styles.info}>
                <h2>{item.meme.name}</h2>
                <p>Rating: {item.meme.rating}</p>
                <p>Pieces: {item.quantity}</p>
                <div className={styles.controls}>
                  <button type="button" onClick={() => decreaseCount(item.meme.id)}>
                    -
                  </button>
                  <button type="button" onClick={() => addItem(item.meme)}>
                    +
                  </button>
                  <button type="button" onClick={() => removeItem(item.meme.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className={styles.summary}>
          <h2>Summary</h2>
          <p>Total price: {totalPrice} credits</p>
          <button type="button" onClick={clearCart} className={styles.clearButton}>
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  )
}

