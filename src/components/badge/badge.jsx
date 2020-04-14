import React from 'react'
import classnames from 'classnames'
import styles from './badge.module.scss'

import Text from '../text'

const BadgeList = ({ children, className }) => (
  <Text className={classnames(styles.badge, className)}>{children}</Text>
)

export default BadgeList
