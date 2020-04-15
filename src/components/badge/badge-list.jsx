import React from 'react'
import { map } from 'ramda'
import styles from './badge.module.scss'

import Badge from './badge'

const BadgeList = ({ listItems }) =>
  map(item => <Badge className={styles.badgeListItem}>{item}</Badge>, listItems)

export default BadgeList
