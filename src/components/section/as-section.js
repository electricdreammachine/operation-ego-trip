import React from 'react'
import { Consumer } from 'store'
import Section from './section'

const asSection = Component => ({ name, elementType, className, ...props}) => (
  <Consumer>
    {({ actions: { registerSection } }) => (
      <Section
        elementType={elementType}
        name={name}
        className={className}
        registerSection={registerSection}
      >
        <Component {...props} />
      </Section>
    )}
  </Consumer>
)

export default asSection