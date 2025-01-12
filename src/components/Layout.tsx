import { useState } from 'react'
import styles from '../styles/Layout.module.css'
import { Users, Code, ClipboardList, BarChart, Menu } from 'lucide-react'
import useQueryConfig from '~/hooks/useQueryConfig'
import { createSearchParams, Link } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryConfig = useQueryConfig()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navItems = [
    { name: 'DEV', icon: <Code size={20} /> },
    { name: 'BA', icon: <ClipboardList size={20} /> },
    { name: 'QC', icon: <Users size={20} /> },
    { name: 'PM', icon: <BarChart size={20} /> }
  ]

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>FSATeam</div>
        <button className={styles.menuButton} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={24} />
        </button>
      </header>
      <div className={styles.content}>
        <nav className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
          {navItems.map((item) => (
            <Link
              to={{
                pathname: '/',
                search: createSearchParams({
                  ...queryConfig,
                  role: item.name.toLowerCase()
                }).toString()
              }}
              key={item.name}
              className={`${styles.navItem} ${item.name.toLowerCase() === queryConfig.role ? styles.active : ''}`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}
