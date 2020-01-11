import { map, all, equals } from 'ramda'

export default rect => {
  const rectValues = map(prop => rect[prop], [
    'x',
    'y',
    'left',
    'top',
    'right',
    'bottom',
    'width',
    'height',
  ])

  return all(equals(0), rectValues)
}
