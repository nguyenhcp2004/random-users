// import { useGetUser } from '~/queries/useUser'
import styles from '../styles/MainContent.module.css'
import { Filter, MapPin, Phone } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import useQueryConfig from '~/hooks/useQueryConfig'
import { createSearchParams, Link } from 'react-router-dom'
import { useGetUsersQuery } from '~/queries/user.service'

export default function MainContent() {
  const queryConfig = useQueryConfig()
  const currentPage = Number(queryConfig.page)
  const totalPages = 10
  // const { data, isLoading } = useGetUser({
  //   ...queryConfig,
  //   page: Number(queryConfig.page),
  //   results: Number(queryConfig.results)
  // })

  const { data, isLoading } = useGetUsersQuery({
    ...queryConfig,
    page: Number(queryConfig.page),
    results: Number(queryConfig.results)
  })

  const users = data?.results || []

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToTop()
  }, [scrollToTop, currentPage])

  const renderPaginationButtons = () => {
    const buttons = []
    const range = 2

    buttons.push(
      <Link
        to={{
          pathname: '/',
          search: createSearchParams({
            ...queryConfig,
            page: (1).toString()
          }).toString()
        }}
        key='first'
        className={`${styles.pageButton} ${currentPage === 1 ? styles.active : ''}`}
      >
        1
      </Link>
    )

    if (currentPage > range + 2) {
      buttons.push(
        <span key='ellipsis-1' className={styles.ellipsis}>
          ...
        </span>
      )
    }

    for (let i = Math.max(2, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
      buttons.push(
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...queryConfig,
              page: i.toString()
            }).toString()
          }}
          key={i}
          className={`${styles.pageButton} ${currentPage === i ? styles.active : ''}`}
        >
          {i}
        </Link>
      )
    }

    if (currentPage < totalPages - range - 1) {
      buttons.push(
        <span key='ellipsis-2' className={styles.ellipsis}>
          ...
        </span>
      )
    }

    if (totalPages > 1) {
      buttons.push(
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...queryConfig,
              page: totalPages.toString()
            }).toString()
          }}
          key='last'
          className={`${styles.pageButton} ${currentPage === totalPages ? styles.active : ''}`}
          // onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Link>
      )
    }

    return buttons
  }

  return (
    <div>
      <div className={styles.filterSection}>
        <span className={styles.filterLabel}>Filter:</span>
        <div className={styles.filterTag}>
          <Filter size={16} />
          <span>{queryConfig.role?.toLocaleUpperCase()}</span>
        </div>
        <div className={styles.genderToggle}>
          <Link
            to={{
              pathname: '/',
              search: createSearchParams({
                ...queryConfig,
                gender: 'male'
              }).toString()
            }}
            className={`${styles.toggleButton} ${queryConfig.gender === 'male' && styles.active}`}
          >
            male
          </Link>
          <Link
            to={{
              pathname: '/',
              search: createSearchParams({
                ...queryConfig,
                gender: 'female'
              }).toString()
            }}
            className={`${styles.toggleButton} ${queryConfig.gender === 'female' && styles.active}`}
          >
            female
          </Link>
        </div>
      </div>

      <div className={styles.cardGrid}>
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.cardHeader}></div>
                  <div className={styles.avatar}></div>
                  <div className={styles.info}>
                    <div className={styles.name}>Loading...</div>
                    <div className={styles.email}>Please wait</div>
                  </div>
                </div>
              ))
          : users.map((user) => (
              <div key={user.email} className={styles.card}>
                <div className={styles.cardHeader}></div>
                <div>
                  <img className={styles.avatar} src={user.picture.medium} alt={user.name.first}></img>
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>{`${user.name.first} ${user.name.last}`}</div>
                  <div className={styles.email}>{user.email}</div>
                  <div className={styles.details}>
                    <div className={styles.detailItem}>
                      <Phone size={16} />
                      <span>{user.phone}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <MapPin size={16} />
                      <span>{`${user.location.city}, ${user.location.country}`}</span>
                    </div>
                    <div>
                      <span className={`${styles.badge} ${styles.badgeSecondary}`}>{user.nat}</span>
                      <span className={`${styles.badge} ${styles.badgeOutline}`}>{user.gender}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className={styles.pagination}>
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage - 1).toString()
            }).toString()
          }}
          className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
        >
          &lt;
        </Link>
        {renderPaginationButtons()}
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage + 1).toString()
            }).toString()
          }}
          className={`${styles.pageButton} ${currentPage === 10 ? styles.disabled : ''}`}
        >
          &gt;
        </Link>
      </div>
    </div>
  )
}
