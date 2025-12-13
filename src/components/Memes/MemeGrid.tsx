import type { Meme } from '../../types/meme'
import { MemeCard } from './MemeCard'
import styles from './MemeGrid.module.css'

interface MemeGridProps {
  memes: Meme[]
}

export function MemeGrid({ memes }: MemeGridProps) {
  return (
    <div className={styles.grid}>
      {memes.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </div>
  )
}

