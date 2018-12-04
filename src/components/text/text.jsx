import React from 'react'

import styles from './text.module.scss'

const Text = ({ children }) => (<span className={styles.text}>{children}</span>)

export default Text