import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { until, isNil, any, gt, __, last, pathOr, map, sum } from 'ramda'
import { randomNumberInRange } from 'common/utils/random-number-in-range'

const makeCubicBezierCurvePath = ({ commandPoint: { x: commandPointX, y: commandPointY }, lineCoords: { x: lineCoordX, y: lineCoordY } }) =>
  `Q ${commandPointX}, ${commandPointY} ${lineCoordX}, ${lineCoordY}`

const AnimationPath = forwardRef(({
  topBound,
  leftBound,
  rightBound,
  bottomBound,
  alternateCurveInterval,
  invertDirection,
}, ref) => {
  if (any(isNil, [topBound, leftBound, rightBound, bottomBound])) return null
  const XCoord = randomNumberInRange(rightBound, leftBound)

  const paths = []

  until(
    gt(__, bottomBound),
    currentYAxis => {
      const YCoord = currentYAxis + alternateCurveInterval
      const fuzzyYCoord = randomNumberInRange(YCoord + 100, YCoord - 100)
      const fuzzyXCoord = sum([paths.length, invertDirection ? 1 : 0]) % 2 === 0
        ? randomNumberInRange(XCoord + alternateCurveInterval / 2 + 100 , XCoord + alternateCurveInterval / 2 - 100)
        : randomNumberInRange(XCoord - alternateCurveInterval / 2 + 100 , XCoord - alternateCurveInterval / 2 - 100)
      
      const newCurve = {
        commandPoint: { x: pathOr(XCoord, ['lineCoords', 'x'], last(paths)), y: fuzzyYCoord },
        lineCoords: { x: fuzzyXCoord, y: fuzzyYCoord },
      }

      paths.push(newCurve)

      return YCoord
    }
  )(topBound)

  return (
    <path
      ref={ref}
      d={[[`M ${XCoord}, 0`], map(makeCubicBezierCurvePath, paths)].join(' ')}
      style={{ 'strokeWidth':'0', 'fill': 'none'}}
    />
  )
}
)

AnimationPath.defaultProps = {
  topBound: 0,
  alternateCurveInterval: 300,
}

AnimationPath.propTypes = {
  topBound: PropTypes.number,
  alternateCurveInterval: PropTypes.number,
}

export default AnimationPath