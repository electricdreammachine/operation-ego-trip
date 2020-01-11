import { last, reduce } from 'ramda'

const calculatePattern = (leftAnchorPoint, boundingWidth, gutter, width) => {
  const calculateLinePosition = lineNumber => lineNumber * gutter

  const getLinePositions = (xAxisAnchorPoint, boundingWidth) => {
    const linePositions = [0]
    const accentedLinePositions = []

    while (last(linePositions) < boundingWidth) {
      const newLinePosition = calculateLinePosition(linePositions.length)
      linePositions.push(newLinePosition)

      if (
        isLineWithinAccentRange(
          newLinePosition,
          xAxisAnchorPoint,
          boundingWidth
        )
      ) {
        accentedLinePositions.push(newLinePosition)
      }
    }

    return {
      linePositions,
      accentedLinePositions,
    }
  }

  const findNearestLineToAnchor = (xAxisAnchorPoint, linePositions) =>
    reduce(
      (acc, value) => {
        const currentClosestValue = Math.abs(xAxisAnchorPoint - acc)
        const distanceFromBoundary = Math.abs(xAxisAnchorPoint - value)

        return distanceFromBoundary < currentClosestValue ? value : acc
      },
      0,
      linePositions
    )

  const isLineWithinAccentRange = (
    lineXPosition,
    xAxisAnchorPoint,
    boundingWidth
  ) => {
    const isLowerBoundary =
      lineXPosition >= xAxisAnchorPoint - gutter * 1.5 &&
      lineXPosition < xAxisAnchorPoint + gutter * 1.5
    const isUpperBoundary =
      lineXPosition >= boundingWidth - xAxisAnchorPoint - gutter * 1.5 &&
      lineXPosition < boundingWidth - xAxisAnchorPoint + gutter * 1.5

    return isLowerBoundary || isUpperBoundary
  }

  const linePositions = getLinePositions(leftAnchorPoint, boundingWidth)
  const nearestLineToAnchor = findNearestLineToAnchor(
    leftAnchorPoint,
    linePositions.accentedLinePositions
  )
  const anchorToLineOffset =
    Math.abs(nearestLineToAnchor) - Math.abs(leftAnchorPoint)

  return {
    ...linePositions,
    anchorToLineOffset,
    boundaries: {
      outer: {
        left: linePositions.accentedLinePositions[2] + width,
        right: linePositions.accentedLinePositions[3] - width,
      },
      inner: {
        left: linePositions.accentedLinePositions[0] - width,
        right: linePositions.accentedLinePositions[5] + width,
      },
    },
  }
}

export default calculatePattern
