/*
TODO: rework to be module, encapsulating pattern building and retrieval logic
enable caching, avoid recalculating and rerunning pattern builder loop
*/

import { last, pipe, slice, reduce, filter } from 'ramda'

export const gutter = 10

export const calculateLinePosition = (lineNumber) => 1 + (lineNumber * gutter)

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

export const findOuterAccentBoundaries = (lineBoundary, width) => {
  const linePositions = getLinePositions((width - lineBoundary) + gutter)
  const boundarisedLinePositions = filter(position => isLineWithinBoundaryRange(position, lineBoundary, width), linePositions)

  return {
    left: boundarisedLinePositions[2] + 2,
    right: boundarisedLinePositions[3] - 2,
  }
}

export const isLineWithinBoundaryRange = (lineXPosition, lineBoundary, boundingWidth) => {
  const isLowerBoundary = lineXPosition >= lineBoundary - gutter * 1.5 &&
    lineXPosition < lineBoundary + gutter * 1.5
  const isUpperBoundary = lineXPosition >= (boundingWidth - lineBoundary) - gutter * 1.5 &&
    lineXPosition < (boundingWidth - lineBoundary) + gutter * 1.5

  return isLowerBoundary || isUpperBoundary
}
