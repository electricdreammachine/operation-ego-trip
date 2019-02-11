import { createElement } from 'react'
import { prop, find, contains, pipe, equals } from 'ramda'

import { Heading, Text } from 'components'
import styles from './introduction.module.scss'

const components = [
  {
    component: children => createElement(
      Text,
      { className: styles.text },
      children
    ),
    element: ['p'],
  },
  {
    component: children => createElement(
      Heading,
      { textSized: true },
      children
    ),
    element: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
]

const findObjectByElementName = objectList => elementName => find(
  object => contains(elementName, prop('element', object)),
  objectList
)

const getComponent = componentObject => prop('component', componentObject)

const getComponentFromElementName = (elementName, objectList) => pipe(
  findObjectByElementName(objectList),
  getComponent
)(elementName)

export const mapElementToComponent = (element = null) => {
  if (!equals('element', prop('type', element))) return null

  const {
      tagName,
      children: [
        { value }
      ]
  } = element

  const component = getComponentFromElementName(tagName, components)

  return component(value)
}