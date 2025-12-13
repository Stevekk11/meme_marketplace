import { useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useFetch } from '../hooks/useFetch'
import { getMemes } from '../services/memeService'
import type { Meme, MemeCategory } from '../types/meme'
import { MemeGrid } from '../components/Memes/MemeGrid'
import { LoadingSkeleton } from '../components/Common/LoadingSkeleton'
import styles from './MemesPage.module.css'

const CATEGORIES: Array<'all' | MemeCategory> = [
  'all',
  'animals',
  'celebrities',
  'gaming',
  'school',
  'random',
]

type SortOption = 'name' | 'rating' | 'size'

export function MemesPage() {
  const { data, loading, error } = useFetch<Meme[]>(() => getMemes(), [])
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState<'all' | MemeCategory>('all')
  const [sort, setSort] = useState<SortOption>('name')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearch(value)
    window.clearTimeout((handleSearchChange as any).timeoutId)
    ;(handleSearchChange as any).timeoutId = window.setTimeout(() => {
      setDebouncedSearch(value)
    }, 300)
  }

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value as 'all' | MemeCategory)
  }

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value as SortOption)
  }

  const filtered = useMemo(() => {
    if (!data) return []

    let result = data

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.trim().toLowerCase()
      result = result.filter((meme) => meme.name.toLowerCase().includes(query))
    }

    if (category !== 'all') {
      result = result.filter((meme) => meme.category === category)
    }

    result = [...result]
    switch (sort) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'size':
        result.sort((a, b) => a.width * a.height - b.width * b.height)
        break
      case 'name':
      default:
        result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [data, debouncedSearch, category, sort])

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Memes</h1>

      <section className={styles.filters}>
        <label>
          Search
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name"
          />
        </label>
        <label>
          Category
          <select value={category} onChange={handleCategoryChange}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All' : cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select value={sort} onChange={handleSortChange}>
            <option value="name">Name A–Z</option>
            <option value="rating">Rating (desc)</option>
            <option value="size">Image size</option>
          </select>
        </label>
      </section>

      {loading && <LoadingSkeleton />}
      {error && <p className={styles.error}>Failed to load memes 😢</p>}
      {!loading && !error && data && <MemeGrid memes={filtered} />}
    </div>
  )
}

