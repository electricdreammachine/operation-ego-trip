import React from 'react'
import Section from './section'

const asSection = Component => ({ name, elementType, className, ...props}) => (
  <Section
    elementType={elementType}
    name={name}
    className={className}
  >
    <Component {...props} />
  </Section>
)

export default asSection