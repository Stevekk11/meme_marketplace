import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import styles from './MainLayout.module.css'

export function MainLayout() {
  return (
    <div className={styles.appLayout}>
      <Navbar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  )
}

