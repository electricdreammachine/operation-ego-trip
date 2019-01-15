import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import root from 'window-or-global'
import { isNil, prop, pipe, unless, propOr } from 'ramda'
import { Pattern, FullBleedGraphic, MaxWidthContainer } from 'components'
import Introduction from './introduction'

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
        root.requestAnimationFrame(this.loop)
    }

    loop = () => {
        this.getLineBoundary()
        return setTimeout(root.requestAnimationFrame(this.loop), 50)
    }

    getLineBoundary = () => {
        const { cutOutNode } = this

        if (cutOutNode.current !== null) {
            const { lineOffset = 0 } = this.props
            const { left, width } = this.cutOutNode.current.getBoundingClientRect()
            const lineBoundary = Math.round((left - lineOffset + width / 2) * 10) / 10

            if (lineBoundary !== this.props.lineBoundary) {
                return this.props.setLineBoundary(lineBoundary)
            }

            return null
        }
        return null
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
                        `M ${right + lineOffset} ${(top + offsetTop) + height / 2}`,
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