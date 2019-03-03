import React from 'react'
import { Consumer } from 'store'
import Section from './section'

const asSection = Component => ({ name, elementType, className, ...props}) => (
  <Consumer>
    {({ actions: { registerSection }, actions, state }) => (
      <Section
        elementType={elementType}
        name={name}
        className={className}
        registerSection={registerSection}
      >
        <Component {...props} {...state} {...actions} />
      </Section>
    )}
  </Consumer>
)

export default asSection