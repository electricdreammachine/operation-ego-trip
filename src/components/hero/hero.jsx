import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'throttle-debounce'
import root from 'window-or-global'

import { isNil, prop, pipe, unless, propOr } from 'ramda'
import { Pattern } from '../pattern'
import FullBleedGraphic from '../full-bleed-graphic'
import MaxWidthContainer from '../max-width-container'
import Introduction from '../introduction'

import styles from './hero.module.scss'

class Hero extends Component {
    constructor() {
        super()
        this.state = {
            offsetTop: 0,
        }

        this.SVGNode = React.createRef()
        this.cutOutNode = React.createRef()
    }

    componentDidMount() {
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

    render() {
        const { boundingWidth, boundingHeight, lineOffset, lineBoundary } = this.props

        const offsetTop = propOr(
            0,
            'pageYOffset',
            root
        )

        const trianglePath = pipe(
            prop(['current']),
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
        )(this.SVGNode)

        const cutOutPath = pipe(
            prop(['current']),
            unless(
                isNil,
                (node) => {
                    const { top, right, bottom, left, width, height } = node.getBoundingClientRect()
                    return [
                        `M ${right - lineOffset} ${(top + offsetTop) + height / 2}`,
                        `L ${(left + lineOffset) + width / 2} ${(top + offsetTop)}`,
                        `L ${left + lineOffset} ${(top + offsetTop) + height / 2}`,
                        `L ${(left + lineOffset) + width / 2} ${(bottom + offsetTop)}`,
                        'Z'
                    ].join(' ')
                }
            ),
        )(this.cutOutNode)

        return (
            <Fragment>
                <FullBleedGraphic ref={this.SVGNode}>
                    <defs>
                        <Pattern
                            lineBoundary={lineBoundary}
                            boundingHeight={boundingHeight}
                            boundingWidth={boundingWidth}
                            patternId="star"
                        />
                    </defs>
                    <path d={trianglePath + '' + cutOutPath} fill-rule="evenodd" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                </FullBleedGraphic>
                <MaxWidthContainer className={styles.gridInherit}>
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
                        {/* <li>Grid Two</li> */}
                    </ul>
                    <Introduction className={styles.introduction}>
                        Beepity boop
                    </Introduction>
                </MaxWidthContainer>
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