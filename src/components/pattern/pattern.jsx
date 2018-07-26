import React, { Component } from 'react'
import { last, pipe, pathOr } from 'ramda'

import styles from './pattern.scss'

const gutter = 10

class Pattern extends Component {
    constructor() {
        super()
        this.state = {
            SVGNode: null,
        }
        this.getSVGNode = this.getSVGNode.bind(this)
    }

    getSVGNode(node) {
        requestIdleCallback(() => this.setState({ SVGNode: node }))
    }

    calculateLinePosition(lineNumber) {
        return 2 + (lineNumber * gutter)
    }

    generateLinesToFillScreen() {
        const { SVGNode } = this.state
        const lines = []

        while (
            pipe(
                last,
                pathOr(0, ['props', 'x1'])
            )(lines) < SVGNode.clientWidth - (gutter + 2) || lines.length === 1) {
            const lineXPosition = this.calculateLinePosition(lines.length)
            const lineAtContainerBoundary = () => {
                //this is currently nonsense
                const isLowerBoundary = lineXPosition > (SVGNode.clientWidth / 2 - 570) - (gutter) * 1.5 &&
                lineXPosition < (SVGNode.clientWidth / 2 - 570) + (gutter) * 1.5
                const isUpperBoundary = lineXPosition > (SVGNode.clientWidth / 2 + 570) - (gutter) * 1.5 &&
                lineXPosition < (SVGNode.clientWidth / 2 + 570) + (gutter) * 1.5

                return  isLowerBoundary || isUpperBoundary
                    
            }
            const strokeStyle = lineAtContainerBoundary() ? 
            {
                'stroke':styles.accentColor,
                'strokeWidth':'4',
                'opacity': '1'
            } : {
                'stroke':styles.patternColor,
                'strokeWidth':'4',
                'opacity': '0.2'
            }
            
            lines.push(
                <line x1={lineXPosition} y1="0" x2={lineXPosition} y2={SVGNode.clientHeight + 10} key={`line-${lines.length}`} style={strokeStyle} />
            )
        }

        return lines
    }

    render() {
        const { SVGNode } = this.state
        return (
            <svg className={styles.pattern} ref={this.getSVGNode}>
                { SVGNode && this.generateLinesToFillScreen() }
            </svg>
        )
    }
}

export default Pattern