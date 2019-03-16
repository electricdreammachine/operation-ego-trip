import React, { useRef, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { last, pipe, pathOr } from 'ramda'
import { StoreContext } from 'store'
import { calculateLinePosition, gutter, isLineWithinBoundaryRange } from './pattern-utils'

import styles from './pattern.scss'

const Pattern = ({ boundingWidth, lineBoundary, patternId }) => {
  const { actions: { setInStore } } = useContext(StoreContext)
  const patternRef = useRef(null)
  const lines = []

  useEffect(() => {
    setInStore({ patternRef })
  }, [patternRef.current])

  while (
    pipe(
      last,
      pathOr(0, ['props', 'x1'])
    )(lines) < boundingWidth - (gutter + 1)) {
    const lineXPosition = calculateLinePosition(lines.length)

    const strokeStyle = isLineWithinBoundaryRange(lineXPosition, lineBoundary, boundingWidth) ?
      {
        'stroke': styles.accentColor,
        'strokeWidth': '2',
        'opacity': '1'
      } : {
        'stroke': styles.patternColor,
        'strokeWidth': '2',
        'opacity': '0.2'
      }

    lines.push(
      <line x1={lineXPosition} y1="0" x2={lineXPosition} y2="100%" key={`line-${lines.length}`} style={strokeStyle} />
    )
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