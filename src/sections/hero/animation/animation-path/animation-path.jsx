import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { until, isNil, any, gt, __, last, pathOr, map, sum } from 'ramda'
import { randomNumberInRange } from 'lib/utils/random-number-in-range'

const makeCubicBezierCurvePath = ({
  commandPoint: { x: commandPointX, y: commandPointY },
  lineCoords: { x: lineCoordX, y: lineCoordY },
}) => `Q ${commandPointX} ${commandPointY} ${lineCoordX} ${lineCoordY}`

const AnimationPath = forwardRef(
  (
    {
      topBound,
      leftBound,
      rightBound,
      bottomBound,
      alternateCurveInterval,
      invertDirection,
    },
    ref
  ) => {
    if (any(isNil, [topBound, leftBound, rightBound, bottomBound])) return null
    const XStart = randomNumberInRange(rightBound, leftBound)

    const paths = []

    until(gt(__, bottomBound), currentYAxis => {
      const YCoord = currentYAxis + alternateCurveInterval
      const fuzzyYCoord = randomNumberInRange(YCoord + 100, YCoord - 100)
      const XCoord =
        sum([paths.length, invertDirection ? 1 : 0]) % 2 === 0
          ? pathOr(XStart, ['lineCoords', 'x'], last(paths)) +
            alternateCurveInterval
          : pathOr(XStart, ['lineCoords', 'x'], last(paths)) -
            alternateCurveInterval

      const newCurve = {
        commandPoint: {
          x: Math.round(pathOr(XStart, ['lineCoords', 'x'], last(paths))),
          y: Math.round(fuzzyYCoord - alternateCurveInterval / 4),
        },
        lineCoords: { x: Math.round(XCoord), y: Math.round(fuzzyYCoord) },
      }

      paths.push(newCurve)

      return YCoord
    })(topBound)

    return (
      <path
        ref={ref}
        d={[`M ${XStart} 0`, ...map(makeCubicBezierCurvePath, paths)].join(' ')}
        style={{ strokeWidth: '0', fill: 'none' }}
      />
    )
  }
)

AnimationPath.defaultProps = {
  topBound: 0,
  alternateCurveInterval: 250,
}

AnimationPath.propTypes = {
  topBound: PropTypes.number,
  alternateCurveInterval: PropTypes.number,
}

export default AnimationPath
