import { Link } from 'react-router-dom'
import styles from './MemeCard.module.css'
import { useCart } from '../../hooks/useCart'
import type { Meme } from '../../types/meme'

interface MemeCardProps {
  meme: Meme
}

export function MemeCard({ meme }: MemeCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(meme)
  }

  return (
    <div className={styles.card}>
      <img src={meme.url} alt={meme.name} className={styles.image} loading="lazy" />
      <div className={styles.content}>
        <h3 className={styles.title}>{meme.name}</h3>
        <div className={styles.metaRow}>
          <span className={styles.category}>{meme.category}</span>
          <span className={styles.rating}>{'★'.repeat(meme.rating)}{'☆'.repeat(5 - meme.rating)}</span>
        </div>
        <div className={styles.buttonsRow}>
          <Link to={`/memes/${meme.id}`} state={{ meme }} className={styles.detailButton}>
            Detail
          </Link>
          <button type="button" onClick={handleAddToCart} className={styles.addButton}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
