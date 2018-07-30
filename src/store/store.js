import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'

const Context = createContext()

const { Provider, Consumer } = Context

class PortfolioState extends Component {
    constructor(props) {
        super(props)

        const { boundingElement } = props

        this.state = {
            boundingElement,
            lineBoundary: 0,
        }
    }

    render() {
        return(
            <Provider
                value={{
                    state: this.state,
                    actions: {
                        setLineBoundary: (lineBoundary) => this.setState({ lineBoundary }),
                    }
                }}
            >
                {this.props.children}
            </Provider>
        )
    }
}

PortfolioState.propTypes = {
    boundingElement: PropTypes.element,
}

export {
    PortfolioState as default, 
    Consumer,
}