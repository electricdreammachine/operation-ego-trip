import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { last, pipe, pathOr } from 'ramda'
import { calculateLinePosition, gutter } from './pattern-utils'

import styles from './pattern.scss'

class Pattern extends Component {
  render() {
    const { boundingHeight, boundingWidth, lineBoundary, patternId } = this.props 
    const lines = []

    while (
        pipe(
            last,
            pathOr(0, ['props', 'x1'])
        )(lines) < boundingWidth - (gutter + 1)) {
        const lineXPosition = calculateLinePosition(lines.length)
        const lineAtContainerBoundary = () => {
            const isLowerBoundary = lineXPosition > lineBoundary - gutter * 1.5 &&
            lineXPosition < lineBoundary + gutter * 1.5
            const isUpperBoundary = lineXPosition > (boundingWidth - lineBoundary) - gutter * 1.5 &&
            lineXPosition < (boundingWidth - lineBoundary) + gutter * 1.5

            return  isLowerBoundary || isUpperBoundary 
        }

        const strokeStyle = lineAtContainerBoundary() ? 
        {
            'stroke':styles.accentColor,
            'strokeWidth':'2',
            'opacity': '1'
        } : {
            'stroke':styles.patternColor,
            'strokeWidth':'2',
            'opacity': '0.2'
        }
        
        lines.push(
            <line x1={lineXPosition} y1="0" x2={lineXPosition} y2={boundingHeight + 10} key={`line-${lines.length}`} style={strokeStyle} />
        )
    }

    return (
        <pattern id={patternId} viewBox={`0,0,${boundingWidth},${boundingHeight}`} width="100%" height="100%" patternUnits="userSpaceOnUse" preserveAspectRatio="xMinYMin meet">
            {lines}
        </pattern>
    )
  }
}

Pattern.propTypes = {
    patternId: PropTypes.string,
    lineBoundary: PropTypes.number,
    boundingWidth: PropTypes.number,
    boundingHeight: PropTypes.number,
}

export default Pattern