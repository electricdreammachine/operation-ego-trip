import React from 'react'
import styles from './badge.module.scss'

import Text from '../text'

const Badge = ({ children }) => <Text className={styles.badge}>{children}</Text>

export default Badge
