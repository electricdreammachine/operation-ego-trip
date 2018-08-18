import React, { Component } from 'react'
import { pipe, prop, isNil, ifElse, always, last, pathOr, forEach } from 'ramda'
import 'common/assets/images/leaf-motif-sprite.svg'
import { Consumer } from '../../../store'
import styles from './pillars.module.scss'

import ContactInformation from '../../contact-information'

const randomNumberInRange = (maximum, minimum) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

class PillarsTemplate extends Component {
    constructor() {
        super()
        this.state = {
            localBoundingElement: null,
        }
    }

    getLocalBoundingElement = (node) => {
        requestIdleCallback(() => {
            this.setState({
                localBoundingElement: node,
            })
        })
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
        const heightInterval = 300
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
                    const isFlipped = Math.random() > 0.5
                    const leftBranchXPosition = randomNumberInRange(nearestLineToBoundary-20, nearestLineToBoundary - 30)
                    const rightBranchXPosition = elementWidth - leftBranchXPosition - 50
                    const yOffset = randomNumberInRange(80, - 80)
                    const rotation = `rotate(${randomNumberInRange(15, -5)} ${leftBranchXPosition + 50} ${branchYPosition + 100})`
                    const leftBranchTransform = isFlipped ? `scale(-1, 1) translate(-${(nearestLineToBoundary) * 2}, ${yOffset})` : `transform(0, ${yOffset})`
                    const rightBranchTransform = isFlipped ? `transform(0, ${yOffset})` : `scale(-1, 1) translate(-${(rightBranchXPosition * 2) + 50}, ${yOffset})`

                    leftBranches.push(
                        <use x={leftBranchXPosition} y={branchYPosition} width={100} height={200} transform={`${leftBranchTransform} ${rotation}`} xlinkHref={`#${id}`} key={`${id}-left-${leftBranches.length}`}/>
                    )

                    rightBranches.push(
                        <use x={rightBranchXPosition} y={branchYPosition} width={100} height={200} transform={`${rightBranchTransform} ${rotation}`} xlinkHref={`#${id}`} key={`${id}-right-${rightBranches.length}`}/>
                    )
                }
            )(['leaf-motif-sprite_outlined-leaves', 'leaf-motif-sprite_solid-leaves'])
        }

        return [...leftBranches, ...rightBranches]
    }

    render() {
        const { height, width } = pipe(
            prop(['localBoundingElement']),
            ifElse(
                isNil,
                always({
                    height: 0,
                    width: 0,
                }),
                (node) => node.getBoundingClientRect()
            )
        )(this.state)

        return (
            <Consumer>
                {({ state: {
                    nearestLineToBoundary,
                    outerAccentBoundaries: {
                        leftOuterBoundary,
                        rightOuterBoundary,
                    },
                    innerAccentBoundaries: {
                        leftInnerBoundary,
                        rightInnerBoundary,
                    }
                }}) => (
                        <div className={styles.pillarsTemplate} ref={this.getLocalBoundingElement}>
                            <svg className={styles.pillarsTemplateGraphic}>
                                <rect x={leftInnerBoundary} y="0" width={leftOuterBoundary - leftInnerBoundary} height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                                <rect x={rightOuterBoundary} y="0" width={rightInnerBoundary - rightOuterBoundary} height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                                {this.setLeafPositions(width, height)}
                                {this.setBranchPositions(nearestLineToBoundary, height, width)}
                            </svg>
                            <ContactInformation />
                        </div>
                    )
                }
            </Consumer>
        )
    }
}

export default PillarsTemplate