import React from 'react'
import PortfolioState from './store'

const withStore = Component => props => (
  <PortfolioState data={props.data}>
    <Component {...props} />
  </PortfolioState>
)

export default withStore
