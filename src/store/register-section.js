import { uniqBy, prop, isEmpty } from 'ramda'

export const registerSection = (sectionName, sectionNode) => state => {
  if (isEmpty(sectionName)) return null
  
  const { sections: existingSections } = state

  return {
    sections: uniqBy(prop('name'), [...existingSections, { name: sectionName, node: sectionNode }]),
  }
}