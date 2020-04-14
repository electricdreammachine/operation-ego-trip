import React, { createElement } from 'react'
import { curry, map, identity, contains, prop, equals, pipe, find } from 'ramda'

import { Heading, Text } from 'components'

const getComponentsWithBoundClassNames = classNames => [
  {
    component: children =>
      createElement(Text, { className: classNames.text }, children),
    element: ['p'],
  },
  {
    component: identity,
    element: ['text'],
  },
  {
    component: children =>
      createElement(
        Heading,
        { className: classNames.heading, textSized: true },
        children
      ),
    element: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
  {
    component: (children, element) =>
      createElement(
        Text,
        { textSized: true, isLink: true },
        <a href={element.properties.href}>{children}</a>
      ),
    element: ['a'],
  },
]

const findObjectByElementName = objectList => elementName =>
  find(object => contains(elementName, prop('element', object)), objectList)

const getComponent = componentObject => prop('component', componentObject)

const getComponentFromElementName = (elementName, objectList) =>
  pipe(findObjectByElementName(objectList), getComponent)(elementName)

const getComponentForElementAndChildren = (element, components) => {
  if (!equals('element', prop('type', element)))
    return getComponentFromElementName(element.type, components)(element.value)

  const component = getComponentFromElementName(element.tagName, components)

  return component(
    map(
      child => getComponentForElementAndChildren(child, components),
      element.children
    ),
    element
  )
}

export const mapElementsToComponents = curry(
  (
    elementTree = { children: [] },
    classNames = { text: null, heading: null }
  ) => {
    const components = getComponentsWithBoundClassNames(classNames)

    console.log(
      map(
        element => getComponentForElementAndChildren(element, components),
        elementTree.children
      )
    )

    return map(
      element => getComponentForElementAndChildren(element, components),
      elementTree.children
    )
  }
)
