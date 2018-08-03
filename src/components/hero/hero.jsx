import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { ifElse, isNil, prop, pipe, always, unless } from 'ramda'
import createLinePattern from '../pattern'

import styles from './hero.scss'

class Hero extends Component {
    constructor() {
        super()
        this.state = {
            SVGNode: null,
            cutOutNode: null,
            cutOutNodeOffset: null,
        }

        this.getSVGNode = this.getSVGNode.bind(this)
        this.getCutOutNode = this.getCutOutNode.bind(this)
    }

    componentDidMount() {
        this.watchForResize()
    }

    watchForResize() {
        this._frameId = window.addEventListener('resize', this.getLineBoundary)
    }

    getLineBoundary = () => {
        const { cutOutNode } = this.state

        if (cutOutNode !== null) {
            const { left, width } = this.state.cutOutNode.getBoundingClientRect()
            const lineBoundary = left + width / 2

            return this.props.setLineBoundary(lineBoundary)
        }
    }
    
    getSVGNode(node) {
        requestIdleCallback(() => this.setState({ SVGNode : node }))
    }

    getCutOutNode(node) {
        requestIdleCallback(() => this.setState({ cutOutNode : node }, this.getLineBoundary))
    }

    static getDerivedStateFromProps(nextProps) {
        const { nearestLineToBoundary, lineBoundary } = nextProps

        return {
            cutOutNodeOffset: Math.abs(nearestLineToBoundary) - Math.abs(lineBoundary + 1)
        }
    }

    render() {
        const { pageYOffset: offsetTop } = window
        const { cutOutNodeOffset } = this.state

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
            prop(['cutOutNode']),
            ifElse(
                isNil,
                always({
                    path: null,
                    lineBoundary: null,
                }),
                (node) => {
                    const { top, right, bottom, left, width, height } = node.getBoundingClientRect()
                    return {
                        path:  [
                            `M ${right} ${(top + offsetTop) + height / 2}`,
                            `L ${left + width / 2} ${(top + offsetTop)}`,
                            `L ${left} ${(top + offsetTop) + height / 2}`,
                            `L ${left + width / 2} ${(bottom + offsetTop)}`,
                            'Z'
                        ].join(' '),
                        lineBoundary: left + width /2,
                    }
                }
            ),
        )(this.state)

        return (
            <Fragment>
                <svg className={styles.heroMask} ref={this.getSVGNode}>
                    <defs>
                        <pattern id="star" viewBox={`0,0,${document.documentElement.clientWidth},${document.documentElement.clientHeight}`} width="100%" height="100%" patternUnits="userSpaceOnUse" preserveAspectRatio="xMinYMin meet"                         >
                         {createLinePattern(cutOutPath.lineBoundary)}
                         </pattern>
                    </defs>
                    <path d={trianglePath + '' + cutOutPath.path} fill-rule="evenodd" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                </svg>
                <nav className={styles.navWrapper}>
                    <ul className={styles.navList}>
                        <li>
                            <div className={styles.wordMarkWrapper} ref={this.getCutOutNode} style={{ 'left': cutOutNodeOffset + 'px' }}>
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
}

export default Hero