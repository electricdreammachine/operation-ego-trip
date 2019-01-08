import React from 'react'
import styles from './skill.module.scss'

import Text from '../text'

const Skills = ({ children }) => (
    <Text className={styles.skill}>
        {children}
    </Text>
)

export default Skills