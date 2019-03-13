import React, { useContext } from 'react'
import { StoreContext } from 'store'
import Section from './section'

const asSection = Component => ({ name, elementType, className, ...props}) => {
  const { actions: { registerSection }, actions, state } = useContext(StoreContext)
  
  return (
    <Section
      elementType={elementType}
      name={name}
      className={className}
      registerSection={registerSection}
    >
      <Component {...props} {...state} {...actions} />
    </Section>
  )
}

export default asSection