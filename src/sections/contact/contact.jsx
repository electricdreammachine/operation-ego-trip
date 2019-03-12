import React, { Component } from 'react'
import { pipe, prop, isNil, ifElse, always, last, pathOr } from 'ramda'
import 'common/assets/images/leaf-motif-sprite.svg'
import { FullBleedGraphic } from 'components'
import { randomNumberInRange } from 'common/utils/random-number-in-range'
import ContactInformation from './contact-information'
import styles from './contact.module.scss'

class Contact extends Component {
  constructor() {
    super()

    this.localBoundingElement = React.createRef()
  }

  setLeafPositions = (elementWidth, height) => {
    const distance = 30
    const leafPositions = []
    const calculateNextLeafPosition = (lineNumber) => 1 + (lineNumber * distance)

    while (pipe(
      last,
      pathOr(0, ['props', 'x'])
    )(leafPositions) < elementWidth) {
      const leafXPosition = calculateNextLeafPosition(leafPositions.length)
      const isFlipped = Math.random() > 0.5
      const rotation = randomNumberInRange(180, 0)
      const opacity = randomNumberInRange(100, 0) / 100
      const transform = isFlipped ? `scale(-1, 1) translate(-${leafXPosition + distance * leafPositions.length}, 0)` : ''
      const yPosition = randomNumberInRange(height - 50, leafPositions.length % 10 === 0 ? height - 165 : height - 65)

      leafPositions.push(
        <use y={yPosition} transform={`${transform} rotate(${rotation} ${leafXPosition + 50} ${yPosition + 50})`} x={leafXPosition} width={100} height={100} key={`leaf-${leafPositions.length}`} opacity={opacity} xlinkHref={`#leaf-motif-sprite_single-leaf`} />
      )
    }

    return leafPositions
  }

  render() {
    const { height, width } = pipe(
      prop(['current']),
      ifElse(
        isNil,
        always({
          height: 0,
          width: 0,
        }),
        (node) => node.getBoundingClientRect()
      )
    )(this.localBoundingElement)

    const {
      contactInfo,
      boundingWidth,
      outerAccentBoundaries: {
        leftOuterBoundary,
        rightOuterBoundary,
      },
    } = this.props

    return (
      <div className={styles.pillarsTemplate} ref={this.localBoundingElement}>
        <FullBleedGraphic>
          <rect x={0} y="0" width={leftOuterBoundary} height="100%" style={{ 'fill': 'url(#star)', 'strokeWidth': '0' }} />
          <rect x={rightOuterBoundary} y="0" width={boundingWidth - rightOuterBoundary} height="100%" style={{ 'fill': 'url(#star)', 'strokeWidth': '0' }} />
          {this.setLeafPositions(width, height)}
        </FullBleedGraphic>
        <ContactInformation contactInfo={contactInfo} />
      </div>
    )
  }
}

export default Contact