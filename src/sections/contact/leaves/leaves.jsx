import React from 'react'
import { pipe, last, pathOr } from 'ramda'
import { randomNumberInRange } from 'lib/utils/random-number-in-range'

const Leaves = ({ elementWidth, height }) => {
  const distance = 30
  const leafPositions = []
  const calculateNextLeafPosition = lineNumber => 1 + lineNumber * distance

  while (pipe(last, pathOr(0, ['props', 'x']))(leafPositions) < elementWidth) {
    const leafXPosition = calculateNextLeafPosition(leafPositions.length)
    const isFlipped = Math.random() > 0.5
    const rotation = randomNumberInRange(180, 0)
    const opacity = randomNumberInRange(100, 0) / 100
    const transform = isFlipped
      ? `scale(-1, 1) translate(-${leafXPosition +
          distance * leafPositions.length}, 0)`
      : ''
    const yPosition = randomNumberInRange(
      height - 50,
      leafPositions.length % 10 === 0 ? height - 165 : height - 65
    )

    leafPositions.push(
      <use
        y={yPosition}
        transform={`${transform} rotate(${rotation} ${leafXPosition +
          50} ${yPosition + 50})`}
        x={leafXPosition}
        width={100}
        height={100}
        key={`leaf-${leafPositions.length}`}
        opacity={opacity}
        xlinkHref={`#leaf-motif-sprite_single-leaf`}
      />
    )
  }

  return leafPositions
}

export default Leaves
