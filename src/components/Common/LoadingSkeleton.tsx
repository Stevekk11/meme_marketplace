import styles from './LoadingSkeleton.module.css'

export function LoadingSkeleton() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.card} />
      ))}
    </div>
  )
}

