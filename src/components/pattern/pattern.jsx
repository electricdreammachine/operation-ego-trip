import React, { useRef, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { map } from 'ramda'
import { PatternContext } from './pattern-context-provider'
import { StoreContext } from 'store'

import styles from './pattern.scss'

const Pattern = ({ patternId }) => {
  const {
    actions: { setInStore },
  } = useContext(StoreContext)
  const [{ pattern }] = useContext(PatternContext)
  const patternRef = useRef(null)

  useEffect(() => {
    setInStore({ patternRef })
  }, [patternRef.current])

  let lines
  if (pattern.linePositions) {
    lines = map(line => {
      const strokeStyle =
        pattern.accentedLinePositions.indexOf(line) !== -1
          ? {
              stroke: styles.accentColor,
              strokeWidth: '2',
              opacity: '1',
            }
          : {
              stroke: styles.patternColor,
              strokeWidth: '2',
              opacity: '0.2',
            }

      return (
        <line
          x1={line}
          y1="0"
          x2={line}
          y2="100%"
          key={`line-${line}`}
          style={strokeStyle}
        />
      )
    }, pattern.linePositions)
  }

  return (
    <pattern
      id={patternId}
      width="100%"
      height="100%"
      patternUnits="userSpaceOnUse"
      patternContentUnits="userSpaceOnUse"
      preserveAspectRatio="xMinYMin meet"
      ref={patternRef}
    >
      {lines}
    </pattern>
  )
}

Pattern.propTypes = {
  patternId: PropTypes.string,
  lineBoundary: PropTypes.number,
  boundingWidth: PropTypes.number,
}

export default Pattern
