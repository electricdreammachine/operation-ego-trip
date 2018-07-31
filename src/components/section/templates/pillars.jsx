import React, { Component } from 'react'
import { pipe, prop, isNil, ifElse, always, last, pathOr } from 'ramda'
import 'common/assets/images/leaf-motif-sprite.svg'
import { Consumer } from '../../../store'
import styles from './pillars.scss'

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
            const randomNumberInRange = (maximum, minimum) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
            const leafXPosition = calculateNextLeafPosition(leafPositions.length)
            const isFlipped = Math.random() > 0.5
            const rotation = randomNumberInRange(30, 0)
            const opacity = randomNumberInRange(100, 0) / 100
            const transform = isFlipped ? `scale(-1, 1) translate(-${leafXPosition + distance * leafPositions.length}, 0) rotate(${rotation})` : null
            const yPosition = randomNumberInRange(height - 75, height - 90)

            leafPositions.push(
                <use y={yPosition} transform={transform} x={leafXPosition} width={150}  height={150} key={`leaf-${leafPositions.length}`} opacity={opacity} xlinkHref={`#leaf-motif-sprite_single-leaf`} />
            )
        }

        return leafPositions
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
                                <use y={height - 90} width={150} height={150} xlinkHref={`#leaf-motif-sprite_single-leaf`} />
                                {this.setLeafPositions(width, height)}
                                <use x={nearestLineToBoundary} xlinkHref={`#leaf-motif-sprite_solid-leaves`} />
                            </svg>
                        </div>
                    )
                }
            </Consumer>
        )
    }
}

export default PillarsTemplate