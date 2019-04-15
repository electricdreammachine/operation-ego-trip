import { reduce, append, pipe, ifElse, isNil, complement, find, propEq } from 'ramda'

const constructNavigationWithInPageSections = (menuLinks, sectionsInPage) => {
  const navigationItems = []

  for (const page of menuLinks) {
    const sections = reduce(
      (accumulator, sectionName) => {
        return pipe(
          sectionName => [sectionName, find(propEq('name', sectionName), sectionsInPage)],
          ifElse(
            ([,nodeInPage]) => complement(isNil)(nodeInPage),
            ([name, { node }]) => append({ name, node, isFoundInPage: true }, accumulator),
            ([name]) => append({ name, link: page.link, isFoundInPage: false }, accumulator),
          )
        )(sectionName)
      },
      [],
      page.sections
    )

    navigationItems.push({ ...page, sections })
  }

  return navigationItems
}

export default constructNavigationWithInPageSections
