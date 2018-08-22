import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'
import root from 'window-or-global'
import { StaticQuery, graphql } from 'gatsby'

import { findNearestLineToBoundary, findOuterAccentBoundaries } from '../components/pattern'

const Context = createContext()

const { Provider, Consumer } = Context

class PortfolioState extends Component {
    constructor() {
        super()

        this.state = {
            boundingWidth: 0,
            boundingHeight: 0,
            lineBoundary: 0,
            nearestLineToBoundary: 0,
            outerAccentBoundaries: {
                leftOuterBoundary: 0,
                rightOuterBoundary: 0,
            },
            innerAccentBoundaries: {
                leftInnerBoundary: 0,
                rightInnerBoundary: 0,
            }
        }
    }

    componentDidMount() {
        this.setState({ boundingHeight: root.innerHeight })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.boundingElement !== null && nextProps.boundingElement !== prevState.boundingElement) {
            const { lineBoundary, nearestLineToBoundary } = prevState
            const boundingWidth = nextProps.boundingElement.clientWidth
            const {
                left: leftOuterBoundary,
                right: rightOuterBoundary
            } = findOuterAccentBoundaries(lineBoundary, boundingWidth)
            const lineDistance = leftOuterBoundary - nearestLineToBoundary
            const leftInnerBoundary = nearestLineToBoundary - lineDistance - 2
            const rightInnerBoundary = rightOuterBoundary + (lineDistance*2) + 2

            return {
                boundingWidth,
                outerAccentBoundaries: {
                    leftOuterBoundary,
                    rightOuterBoundary,
                },
                innerAccentBoundaries: {
                    leftInnerBoundary,
                    rightInnerBoundary,
                }
            }
        }

        return null
    }

    render() {
        return(
            <StaticQuery
                query={
                    graphql`
                    query { ...contentQuery }
                    `
                }
                render={
                    (data) =>
                        <Provider
                            value={{
                                state: this.state,
                                domain: data,
                                actions: {
                                    setLineBoundary: (lineBoundary) => {
                                        const nearestLineToBoundary = findNearestLineToBoundary(lineBoundary)
                                        const lineOffset =  Math.abs(nearestLineToBoundary) - Math.abs(lineBoundary + 1)

                                        this.setState({
                                            lineBoundary,
                                            nearestLineToBoundary,
                                            lineOffset,
                                        })
                                    },
                                }
                            }}
                        >
                        {this.props.children}
                    </Provider>
                }
            >
            </StaticQuery>
        )
    }
}

PortfolioState.propTypes = {
    boundingElement: PropTypes.node,
}

export {
    PortfolioState as default, 
    Consumer,
}