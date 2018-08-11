import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'
import root from 'window-or-global'
import { StaticQuery, graphql } from 'gatsby'
// import { createClient } from 'contentful'

import { findNearestLineToBoundary, findOuterAccentBoundaries } from '../components/pattern'

const Context = createContext()

const { Provider, Consumer } = Context

// const contentfulClient = createClient({
//     space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
//     accessToken: process.env.REACT_APP_CONTENTFUL_KEY
// })

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
            return {
                boundingWidth: nextProps.boundingElement.clientWidth,
            }
        }
    }

    // componentDidMount() {
    //     contentfulClient.getContentTypes()
    //     .then(function (entries) {
    //         console.log(entries)
    //     })
    // }

    render() {
        const { boundingWidth } = this.state
        return(
            <StaticQuery
                query={
                    graphql`
                        {
                        allFiles: allFile {
                          fileDefintions: edges {
                            node {
                              name
                              relativePath
                              extension
                              base
                            }
                          }
                        }
                      }
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
                                        const {
                                            left: leftOuterBoundary,
                                            right: rightOuterBoundary
                                        } = findOuterAccentBoundaries(lineBoundary, boundingWidth)
                                        const nearestLineToBoundary = findNearestLineToBoundary(lineBoundary)
                                        const lineDistance = leftOuterBoundary - nearestLineToBoundary
                                        const leftInnerBoundary = nearestLineToBoundary - lineDistance - 2
                                        const rightInnerBoundary = rightOuterBoundary + (lineDistance*2) + 2


                                        this.setState({
                                            lineBoundary,
                                            nearestLineToBoundary,
                                            outerAccentBoundaries: {
                                                leftOuterBoundary,
                                                rightOuterBoundary,
                                            },
                                            innerAccentBoundaries: {
                                                leftInnerBoundary,
                                                rightInnerBoundary,
                                            }
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