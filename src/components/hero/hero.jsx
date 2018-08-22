import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import root from 'window-or-global'

import { isNil, prop, pipe, unless } from 'ramda'
import { Pattern } from '../pattern'

import styles from './hero.module.scss'

class Hero extends Component {
    constructor() {
        super()
        this.state = {
            SVGNode: null,
            offsetTop: 0,
        }

        this.getSVGNode = this.getSVGNode.bind(this)
        this.cutOutNode = React.createRef()
    }

    componentDidMount() {
        this.setState({ offsetTop: root.pageYOffset })
        this.getLineBoundary()
        root.addEventListener('resize', this.getLineBoundary)
    }

    getLineBoundary = () => {
        const { cutOutNode } = this

        if (cutOutNode.current !== null) {
            const { left, width } = this.cutOutNode.current.getBoundingClientRect()
            const lineBoundary = left + width / 2

            return this.props.setLineBoundary(lineBoundary)
        }
    }
    
    getSVGNode(node) {
        requestIdleCallback(() => this.setState({ SVGNode : node }))
    }

    // getCutOutNode(node) {
    //     requestIdleCallback(() => this.setState({ cutOutNode : node }, this.getLineBoundary))
    // }

    render() {
        const { offsetTop } = this.state
        const { boundingWidth, boundingHeight, lineOffset, lineBoundary } = this.props

        const trianglePath = pipe(
            prop(['SVGNode']),
            unless(
                isNil,
                (node) => {
                    const { height } = node.getBoundingClientRect()
                    return [
                        `M 0 0`,
                        `L ${height} 0`,
                        `L 0 ${height}`,
                        'Z'
                    ].join(' ')
                }
            ),
        )(this.state)

        const cutOutPath = pipe(
            prop(['current']),
            unless(
                isNil,
                (node) => {
                    const { top, right, bottom, left, width, height } = node.getBoundingClientRect()
                    return [
                        `M ${right} ${(top + offsetTop) + height / 2}`,
                        `L ${left + width / 2} ${(top + offsetTop)}`,
                        `L ${left} ${(top + offsetTop) + height / 2}`,
                        `L ${left + width / 2} ${(bottom + offsetTop)}`,
                        'Z'
                    ].join(' ')
                }
            ),
        )(this.cutOutNode)

        console.log(lineBoundary)

        return (
            <Fragment>
                <svg className={styles.heroMask} ref={this.getSVGNode}>
                    <defs>
                        <Pattern
                            lineBoundary={lineBoundary}
                            boundingHeight={boundingHeight}
                            boundingWidth={boundingWidth}
                            patternId="star"
                        />
                    </defs>
                    <path d={trianglePath + '' + cutOutPath} fill-rule="evenodd" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                </svg>
                <nav className={styles.navWrapper}>
                    <ul className={styles.navList}>
                        <li>
                            <div className={styles.wordMarkWrapper} ref={this.cutOutNode} style={{ 'left': lineOffset + 'px' }}>
                                <span className={styles.wordMark}>
                                    Oliver Smith
                                    <span className={styles.tagline}>
                                        Software Engineeer
                                    </span>
                                </span>
                            </div>
                        </li>
                        <li>Grid Two</li>
                    </ul>
                </nav>
            </Fragment>
        )
    }
}

Hero.propTypes = {
    setLineBoundary: PropTypes.func,
    boundingWidth: PropTypes.number,
    boundingHeight: PropTypes.number,
}

export default Hero