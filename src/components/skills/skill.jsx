import React from 'react'
import styles from './skill.module.scss'

const Skills = ({ children }) => (
    <span className={styles.skill}>
        {children}
    </span>
)

export default Skills