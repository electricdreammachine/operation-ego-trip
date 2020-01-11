import React from 'react'
import PropTypes from 'prop-types'

const Username = ({ username, styles }) => {
  if (/\w+@/.test(username)) {
    const parts = username.split(/(@)/)

    return (
      <span className={styles.emailAddress}>
        <span>{parts[0]}</span>
        <span>{parts.slice(1, parts.length)}</span>
      </span>
    )
  }

  return <span>{username}</span>
}

Username.propTypes = {
  username: PropTypes.string,
  styles: PropTypes.object,
}

Username.defaultProps = {
  username: '',
  styles: { emailAddress: null },
}

export default Username
