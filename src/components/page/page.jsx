import React from 'react'
import styles from './page.module.scss'

const Page = ({ children }) => (
  <div className={styles.page}>
    {children}
  </div>
)

export default Page