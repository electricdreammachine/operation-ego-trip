import React, { Fragment, Component } from 'react'
import { ifElse, isNil, prop, pipe, always } from 'ramda'
import Pattern from '../pattern'

import styles from './hero.scss'

class Hero extends Component {
    constructor() {
        super()
        this.state = {
            SVGNode: null,
        }

        this.getSVGNode = this.getSVGNode.bind(this)
    }

    getSVGNode(node) {
        requestIdleCallback(() => this.setState({ SVGNode : node }))
    }

    render() {
        const height = pipe (
            prop(['SVGNode']),
            ifElse(
                isNil,
                always(0),
                (node) => node.getBoundingClientRect().height
            )
        )(this.state)

        return (
            <Fragment>
                <svg className={styles.heroMask} ref={this.getSVGNode}>
                    <polygon points={`0,0 0,${height} ${height},0`} style={{'fill':'lime', 'strokeWidth':'0'}} />
                </svg>
                <Pattern />
            </Fragment>
        )
    }
}

export default Hero