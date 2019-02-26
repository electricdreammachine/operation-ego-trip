import React, { Component } from 'react'
import { pipe, prop, isNil, ifElse, always, last, pathOr, forEach } from 'ramda'
import 'common/assets/images/leaf-motif-sprite.svg'
import { Consumer } from 'store'
import { FullBleedGraphic } from 'components'
import { randomNumberInRange } from 'common/utils/random-number-in-range'

import styles from './contact.module.scss'
import ContactInformation from './contact-information'

class PillarsTemplate extends Component {
    constructor() {
        super()
        
        this.localBoundingElement = React.createRef()
    }

    setLeafPositions = (elementWidth, height) => {
        const distance = 20
        const leafPositions = []
        const calculateNextLeafPosition = (lineNumber)  =>  1 + (lineNumber * distance)

        while(pipe(
            last,
            pathOr(0, ['props', 'x'])
        )(leafPositions) < elementWidth - distance) {
            const leafXPosition = calculateNextLeafPosition(leafPositions.length)
            const isFlipped = Math.random() > 0.5
            const rotation = randomNumberInRange(180, 0)
            const opacity = randomNumberInRange(100, 0) / 100
            const transform = isFlipped ? `scale(-1, 1) translate(-${leafXPosition + distance * leafPositions.length}, 0)` : ''
            const yPosition = randomNumberInRange(height - 50, leafPositions.length % 10 === 0 ? height - 165 : height - 65)

            leafPositions.push(
                <use y={yPosition} transform={`${transform} rotate(${rotation} ${leafXPosition + 50} ${yPosition + 50})`} x={leafXPosition} width={100}  height={100} key={`leaf-${leafPositions.length}`} opacity={opacity} xlinkHref={`#leaf-motif-sprite_single-leaf`} />
            )
        }

        return leafPositions
    }

    setBranchPositions = (nearestLineToBoundary, elementHeight, elementWidth) => {
        const heightInterval = 200
        const calculateNextBranchPosition = (lineNumber)  =>  1 + (lineNumber * heightInterval)
        const leftBranches = []
        const rightBranches = []

        while(pipe(
            last,
            pathOr(0, ['props', 'y'])
        )(leftBranches) < elementHeight - heightInterval) {
            const branchYPosition = calculateNextBranchPosition(leftBranches.length / 2)

            forEach(
                (id) => {
                    const randomisedLeftXPosition = randomNumberInRange(nearestLineToBoundary - 20, nearestLineToBoundary - 30)
                    const yOffset = randomNumberInRange(80, - 80)
                    const props = {
                        left: {
                            xPosition: randomisedLeftXPosition,
                            yPosition: branchYPosition,
                            transform: `scale(-1, 1) translate(-${(nearestLineToBoundary) * 2}, ${yOffset}) rotate(${randomNumberInRange(15, -5)} ${randomisedLeftXPosition + 50} ${branchYPosition + 100})`
                        },
                        right: {
                            xPosition: elementWidth - randomisedLeftXPosition - 40,
                            yPosition: branchYPosition,
                            transform: `translate(0, ${yOffset}) rotate(${randomNumberInRange(15, -5)} ${elementWidth - randomisedLeftXPosition - 40} ${branchYPosition + 100})`
                        }
                    }

                    leftBranches.push(
                        <use x={props['left'].xPosition} y={props['left'].yPosition} width={80} height={170} transform={props['left'].transform} xlinkHref={`#${id}`} key={`${id}-left-${leftBranches.length}`}/>
                    )

                    rightBranches.push(
                        <use x={props['right'].xPosition} y={props['right'].yPosition} width={80} height={170} transform={props['right'].transform} xlinkHref={`#${id}`} key={`${id}-right-${rightBranches.length}`}/>
                    )
                }
            )(['leaf-motif-sprite_outlined-leaves', 'leaf-motif-sprite_solid-leaves'])
        }

        return [...leftBranches, ...rightBranches]
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

        return (
            <Consumer>
                {({ state: {
                    boundingWidth,
                    outerAccentBoundaries: {
                        leftOuterBoundary,
                        rightOuterBoundary,
                    },
                    innerAccentBoundaries: {
                        leftInnerBoundary,
                        rightInnerBoundary,
                    }
                }}) => (
                        <div className={styles.pillarsTemplate} ref={this.localBoundingElement}>
                            <FullBleedGraphic className={styles.graphic}>
                                <rect x={0} y="0" width={leftOuterBoundary} height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                                <rect x={rightOuterBoundary} y="0" width={boundingWidth - rightOuterBoundary} height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                                {this.setLeafPositions(width, height)}
                                {/* {this.setBranchPositions(nearestLineToBoundary, height, width)} */}
                            </FullBleedGraphic>
                            <ContactInformation />
                        </div>
                    )
                }
            </Consumer>
        )
    }
}

export default PillarsTemplate