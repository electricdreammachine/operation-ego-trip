import React from 'react'
import classnames from 'classnames'
import styles from './text.module.scss'

const Text = ({ children, className, isLink }) => (
    <div
        className={classnames(styles.text, className, { [styles.isLink]: isLink })}
    >
        {children}
    </div>
)

export default Text