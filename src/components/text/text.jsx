import React from 'react'
import classnames from 'classnames'
import styles from './text.module.scss'

const Text = ({ children, className }) => (
    <div
        className={classnames(styles.text, className)}
    >
        {children}
    </div>
)

export default Text