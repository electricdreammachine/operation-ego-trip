import React from 'react'
import PortfolioState from './store'

const withStore = Component => props => (
  <PortfolioState>
    <Component {...props} />
  </PortfolioState>
)

export default withStore