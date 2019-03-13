import React from 'react'
import PortfolioState from './store'

const withStore = Component => props => {
  console.log(Component)
  return (
    <PortfolioState>
      <Component {...props} />
    </PortfolioState>
  )  
}
export default withStore