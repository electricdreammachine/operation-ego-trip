import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import root from 'window-or-global'
import { complement, isNil, all } from 'ramda'
import { Pattern, FullBleedGraphic, MaxWidthContainer } from 'components'
import { createShapes } from './create-shapes'
import Introduction from './introduction'
import Navigation from './navigation'
import Animation from './animation'
 
import styles from './hero.module.scss'

class Hero extends Component {
    constructor() {
        super()
        this.state = {
          offsetTop: 0,
          paths: {
            trianglePath: null,
            cutOutPath: null,
          },
        }

        this.SVGNode = React.createRef()
        this.cutOutNode = React.createRef()
        this.navigationNode = React.createRef()
    }

    componentDidMount() {
        this.getLineBoundary()
        root.requestIdleCallback(this.loop)
        window.addEventListener('orientationchange', () => root.location.reload())

        // setTimeout(() => {
        //     const path = anime.path('.buttspath')
        //     anime({
        //         targets: '#butts',
        //         translateX: path('x'),
        //         translateY: path('y'),
        //         rotate: path('angle'),
        //         duration: 15000,
        //         opacity: {
        //             value: 0,
        //             duration: 10000,
        //         },
        //         loop: true,
        //         easing: 'easeInOutQuad'
        //       })
        // }, 1000)
    }

    componentDidUpdate(prevProps) {
      if (prevProps.lineOffset !== this.props.lineOffset) {
        const { trianglePath, cutOutPath } = createShapes(
          this.SVGNode.current,
          this.cutOutNode.current,
          this.props.lineBoundary,
          this.props.boundingWidth,
          root
        )

        this.setState({ paths: { trianglePath, cutOutPath } })
      }
    }

    loop = () => {
        this.getLineBoundary()
        return root.requestIdleCallback(this.loop)
    }

    getLineBoundary = () => {
        const { cutOutNode } = this

        if (cutOutNode.current !== null) {
            const { lineOffset = 0 } = this.props
            const { left, width } = this.cutOutNode.current.getBoundingClientRect()
            const lineBoundary = (left - lineOffset) + width / 2

            if (Math.round(lineBoundary) !== Math.round(this.props.lineBoundary)) {
                return this.props.setLineBoundary(Math.round(lineBoundary))
            }

            return null
        }
        return null
    }

    // animationPath() {
    //     const { cutOutNode: { current: start }, navigationNode: { current: end }, SVGNode: { current: container } } = this
        
    //     if (!isNil(start) && !isNil(end)) {
    //         return (<AnimationPath
    //             topBound={0}
    //             bottomBound={container.getBoundingClientRect().bottom}
    //             leftBound={end.getBoundingClientRect().left + 500}
    //             rightBound={end.getBoundingClientRect().right}
    //         />)
    //     }
    // }

    render() {
        const { boundingWidth, boundingHeight, lineOffset, lineBoundary, sections } = this.props
        const { paths: { trianglePath, cutOutPath } } = this.state

        let Path = null
        if (all(complement(isNil), [trianglePath, cutOutPath])) {
          Path = <path d={trianglePath + '' + cutOutPath} style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
        }

        return (
            <Fragment>
                <FullBleedGraphic className={styles.heroGraphic} ref={this.SVGNode}>
                    <defs>
                        <Pattern
                            lineBoundary={lineBoundary}
                            boundingHeight={boundingHeight}
                            boundingWidth={boundingWidth}
                            patternId="star"
                        />
                    </defs>
                  {Path}
                </FullBleedGraphic>
                <Animation
                    xAxisBoundingElement={this.navigationNode.current}
                    yAxisBoundingElement={this.SVGNode.current}
                />
                <MaxWidthContainer className={styles.gridInherit}>
                    <div className={styles.navList}>
                        <div className={styles.wordMarkWrapper} ref={this.cutOutNode} style={{ 'left': lineOffset + 'px' }}>
                            <span className={styles.wordMark}>
                                Oliver Smith
                                <span className={styles.tagline}>
                                    Software Engineeer
                                </span>
                            </span>
                        </div>
                        <div className={styles.navigationWrapper}>
                            <Navigation sections={sections} ref={this.navigationNode}/>
                        </div>
                    </div>
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