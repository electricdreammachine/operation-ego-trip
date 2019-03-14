import { isEmpty } from 'ramda'

export const registerSection = (sectionName, sectionNode) => {
  if (isEmpty(sectionName)) return

  return { name: sectionName, node: sectionNode }
}