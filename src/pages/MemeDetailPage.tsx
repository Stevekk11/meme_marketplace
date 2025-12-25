import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Meme } from '../types/meme'
import { getMemeById } from '../services/memeService'
import { useCart } from '../hooks/useCart'
import styles from './MemeDetailPage.module.css'

export function MemeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation() as { state?: { meme?: Meme } }
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [meme, setMeme] = useState<Meme | null>(location.state?.meme ?? null)
  const [related, setRelated] = useState<Meme[]>([])
  const [loading, setLoading] = useState(!location.state?.meme)
  const [error, setError] = useState<string | null>(null)

  // Reset meme state when id changes (for related meme navigation)
  useEffect(() => {
    setMeme(location.state?.meme ?? null)
    setError(null)
    setLoading(!location.state?.meme)
  }, [id])

  useEffect(() => {
    if (meme || !id) return

    setLoading(true)
    getMemeById(id)
      .then((found) => {
        if (!found) {
          setError('Meme not found')
          return
        }
        setMeme(found)
      })
      .catch(() => setError('Failed to load meme detail'))
      .finally(() => setLoading(false))
  }, [id, meme])

  useEffect(() => {
    if (!meme) return

    import('../services/memeService').then(({ getMemes }) => {
      getMemes()
        .then((memes) => {
          const candidates = memes.filter((m) => m.category === meme.category && m.id !== meme.id)
          setRelated(candidates.slice(0, 3))
        })
        .catch(() => setRelated([]))
    })
  }, [meme])

  if (loading) {
    return <p>Loading meme...</p>
  }

  if (error || !meme) {
    return (
      <div className={styles.page}>
        <p>{error ?? 'Meme not found'}</p>
        <button type="button" onClick={() => navigate('/memes')} className={styles.backButton}>
          Back to list
        </button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(meme)
  }

  return (
    <div className={styles.page}>
      <button type="button" onClick={() => navigate('/memes')} className={styles.backButton}>
        ← Back to list
      </button>

      <div className={styles.layout}>
        <img src={meme.url} alt={meme.name} className={styles.image} loading="lazy" />
        <div className={styles.info}>
          <h1>{meme.name}</h1>
          <p className={styles.rating}>{'★'.repeat(meme.rating)}{'☆'.repeat(5 - meme.rating)}</p>
          <p>Category: {meme.category}</p>
          <p>
            Dimensions: {meme.width} × {meme.height}
          </p>
            <p>
                Note: i hate react🤢
            </p>
          <button type="button" onClick={handleAddToCart} className={styles.addButton}>
            Add to cart
          </button>
        </div>
      </div>

      <section className={styles.relatedSection}>
        <h2>Related memes</h2>
        <div className={styles.relatedGrid}>
          {related.map((rm) => (
            <button
              key={rm.id}
              type="button"
              className={styles.relatedCard}
              onClick={() => navigate(`/memes/${rm.id}`, { state: { meme: rm } })}
            >
              <img src={rm.url} alt={rm.name} loading="lazy" />
              <span>{rm.name}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
