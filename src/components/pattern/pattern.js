import React from 'react'
import { last, pipe, pathOr, slice, reduce } from 'ramda'

import styles from './pattern.scss'

const gutter = 10

const calculateLinePosition = (lineNumber)  =>  1 + (lineNumber * gutter)

const createLinePattern = (lineBoundary, windowContext = window) => {
    const lines = []

    while (
        pipe(
            last,
            pathOr(0, ['props', 'x1'])
        )(lines) < windowContext.innerWidth - (gutter + 1) || lines.length === 1) {
        const lineXPosition = calculateLinePosition(lines.length)
        const lineAtContainerBoundary = () => {
            //this is currently nonsense
            const isLowerBoundary = lineXPosition > lineBoundary - (gutter) * 1.5 &&
            lineXPosition < lineBoundary + (gutter) * 1.5
            const isUpperBoundary = lineXPosition > lineBoundary - (gutter) * 1.5 &&
            lineXPosition < lineBoundary + (gutter) * 1.5

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
            <line x1={lineXPosition} y1="0" x2={lineXPosition} y2={windowContext.innerHeight + 10} key={`line-${lines.length}`} style={strokeStyle} />
        )
    }

    return lines
}

const findNearestLineToBoundary = (lineBoundary) => {
    const linePositions = [0]

    while (last(linePositions) < lineBoundary) {
        linePositions.push(calculateLinePosition(linePositions.length))
    }

    const nearestLineToBoundary = pipe(
        slice(linePositions.length - 2, linePositions.length),
        reduce((acc, value) => {
                const currentClosestValue = Math.abs(lineBoundary - acc)
                const distanceFromBoundary = Math.abs(lineBoundary - value)

                return distanceFromBoundary < currentClosestValue ? value : acc
            },
            0
        )
    )(linePositions)

    return nearestLineToBoundary
}

export {
    createLinePattern as default,
    findNearestLineToBoundary,
}