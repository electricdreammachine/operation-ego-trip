import React from 'react'
import { last, pipe, pathOr, slice, reduce } from 'ramda'

import styles from './pattern.scss'

const gutter = 10

const calculateLinePosition = (lineNumber)  =>  1 + (lineNumber * gutter)

const createLinePattern = (lineBoundary, width, height) => {
    const lines = []

    while (
        pipe(
            last,
            pathOr(0, ['props', 'x1'])
        )(lines) < width - (gutter + 1)) {
        const lineXPosition = calculateLinePosition(lines.length)
        const lineAtContainerBoundary = () => {
            const isLowerBoundary = lineXPosition > lineBoundary - gutter * 1.5 &&
            lineXPosition < lineBoundary + gutter * 1.5
            const isUpperBoundary = lineXPosition > (width - lineBoundary) - gutter * 1.5 &&
            lineXPosition < (width - lineBoundary) + gutter * 1.5

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
            <line x1={lineXPosition} y1="0" x2={lineXPosition} y2={height + 10} key={`line-${lines.length}`} style={strokeStyle} />
        )
    }

    return lines
}

const getLinePositions = (lineBoundary) => {
    const linePositions = [0]

    while (last(linePositions) < lineBoundary) {
        linePositions.push(calculateLinePosition(linePositions.length))
    }

    return linePositions
}

const findNearestLineToBoundary = (lineBoundary) => {
    const linePositions = getLinePositions(lineBoundary)

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

const findOuterAccentBoundaries = (lineBoundary, width) => {
    const linePositions = getLinePositions(lineBoundary)
    const leftOuterBoundary = last(linePositions) + 2
    const rightOuterBoundary = width - leftOuterBoundary - 2

    return {
        left: leftOuterBoundary,
        right: rightOuterBoundary
    }
}

export {
    createLinePattern as default,
    findNearestLineToBoundary,
    findOuterAccentBoundaries,
}