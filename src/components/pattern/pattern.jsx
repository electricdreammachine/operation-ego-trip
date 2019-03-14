import React from 'react'
import PropTypes from 'prop-types'
import { last, pipe, pathOr } from 'ramda'
import { calculateLinePosition, gutter, isLineWithinBoundaryRange } from './pattern-utils'

import styles from './pattern.scss'

const Pattern = ({ boundingWidth, lineBoundary, patternId }) => {
  const lines = []

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