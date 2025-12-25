import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../hooks/useCart'
import { getMemes } from '../services/memeService'
import type { Meme } from '../types/meme'
import styles from './DashboardPage.module.css'

export function DashboardPage() {
  const { user } = useAuth()
  const { totalItems } = useCart()
  const [memesCount, setMemesCount] = useState<number | null>(null)
  const [categories, setCategories] = useState<Set<string> | null>(null)
  const [popularMemes, setPopularMemes] = useState<Meme[]>([])
  const [memeOfTheDay, setMemeOfTheDay] = useState<Meme | null>(null)

  useEffect(() => {
    getMemes()
      .then((memes) => {
        setMemesCount(memes.length)
        setCategories(new Set(memes.map((m) => m.category)))
        const top = [...memes].sort((a, b) => b.rating - a.rating).slice(0, 3)
        setPopularMemes(top)
        setMemeOfTheDay(memes[Math.floor(Math.random() * memes.length)])
      })
      .catch(() => {
        setMemesCount(0)
        setCategories(new Set())
      })
  }, [])

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Welcome, {user?.username}</h1>
      <p className={styles.subtitle}>Meme Admin Panel overview (i hate react🤢)</p>

      {memeOfTheDay && (
        <section className={styles.memeOfTheDay}>
          <h2>Meme of the Day</h2>
          <Link to={`/memes/${memeOfTheDay.id}`} state={{ meme: memeOfTheDay }} className={styles.memeOfTheDayCard}>
            <img src={memeOfTheDay.url} alt={memeOfTheDay.name} loading="lazy" />
            <div>
              <h3>{memeOfTheDay.name}</h3>
              <p>Rating: {'★'.repeat(memeOfTheDay.rating)}</p>
            </div>
          </Link>
        </section>
      )}

      <section className={styles.statsGrid}>
        <article className={styles.card}>
          <h2>Total memes</h2>
          <p className={styles.statValue}>{memesCount ?? '...'}</p>
        </article>
        <article className={styles.card}>
          <h2>Categories</h2>
          <p className={styles.statValue}>{categories?.size ?? '...'}</p>
        </article>
        <article className={styles.card}>
          <h2>Items in cart</h2>
          <p className={styles.statValue}>{totalItems}</p>
        </article>
        <article className={styles.card}>
          <h2>Go to memes</h2>
          <Link to="/memes" className={styles.primaryButton}>
            Browse memes
          </Link>
        </article>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Most popular memes</h2>
        <div className={styles.popularGrid}>
          {popularMemes.map((meme) => (
            <Link key={meme.id} to={`/memes/${meme.id}`} state={{ meme }} className={styles.popularCard}>
              <img src={meme.url} alt={meme.name} loading="lazy" />
              <div>
                <h3>{meme.name}</h3>
                <p>Rating: {'★'.repeat(meme.rating)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
