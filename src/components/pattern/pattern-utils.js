import { last, pipe, slice, reduce } from 'ramda'

export const gutter = 10

export const calculateLinePosition = (lineNumber)  =>  1 + (lineNumber * gutter)

export const getLinePositions = (lineBoundary) => {
    const linePositions = [0]

    while (last(linePositions) < lineBoundary) {
        linePositions.push(calculateLinePosition(linePositions.length))
    }

    return linePositions
}

export const findNearestLineToBoundary = (lineBoundary) => {
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

export const findOuterAccentBoundaries = (nearestLineToBoundary, width) => {
    const linePositions = getLinePositions(nearestLineToBoundary + gutter)
    const leftOuterBoundary = last(linePositions) + 2
    const rightOuterBoundary = width - leftOuterBoundary - 2

    return {
        left: leftOuterBoundary,
        right: rightOuterBoundary
    }
}