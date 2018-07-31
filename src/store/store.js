import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'
import { createClient } from 'contentful'

import { findNearestLineToBoundary, findOuterAccentBoundaries } from '../components/pattern'

const Context = createContext()

const { Provider, Consumer } = Context

const contentfulClient = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_KEY
})

class PortfolioState extends Component {
    constructor(props) {
        super(props)

        const { boundingElement } = props

        this.state = {
            boundingElement,
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
        contentfulClient.getContentTypes()
        .then(function (entries) {
            console.log(entries)
        })
    }

    render() {
        return(
            <Provider
                value={{
                    state: this.state,
                    actions: {
                        setLineBoundary: (lineBoundary) => {
                            const {
                                left: leftOuterBoundary,
                                right: rightOuterBoundary
                            } = findOuterAccentBoundaries(lineBoundary)
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