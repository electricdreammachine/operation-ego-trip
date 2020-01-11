import React, { createContext, useState } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import { mergeDeepRight, uniqBy, prop, reject, isNil, pipe } from 'ramda'

import { registerSection } from './register-section'

const StoreContext = createContext()

/*
arguably should be a redux store, but seemed overkill for such a small project
so seeing how far I can get just using react apis
*/

const PortfolioState = ({ children, data }) => {
  // this however should absolutely be a useReducer at this point -> TODO
  const [state, setState] = useState({
    patternRef: null,
    sectionsOnPage: [],
  })

  const updateStore = newStoreProps =>
    batch(() => setState(prevState => mergeDeepRight(prevState, newStoreProps)))
  const updateSections = newSection =>
    batch(() =>
      setState(prevState =>
        mergeDeepRight(prevState, {
          sectionsOnPage: pipe(
            uniqBy(prop('name')),
            reject(isNil)
          )([...prevState.sectionsOnPage, newSection]),
        })
      )
    )

  return (
    <StoreContext.Provider
      value={{
        state,
        domain: data,
        actions: {
          setInStore: newState => {
            updateStore(newState)
          },
          registerSection: (sectionName, sectionNode) => {
            updateSections(registerSection(sectionName, sectionNode))
          },
        },
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export { PortfolioState as default, StoreContext }
