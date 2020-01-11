import constructNavigationWithInPageSections from './construct-navigation-with-in-page-sections'

describe('constructNavigationWithInPageSections', () => {
  const menuLinks = [
    {
      name: 'Software',
      link: '/',
      sections: ['Experience', 'Skills', 'Contact'],
    },
    {
      name: 'art',
      link: '/art',
      sections: ['Gallery'],
    },
  ]

  it('creates an array of top level navigation items, with a property for sections if defined', () => {
    const expectedLinks = [
      {
        name: 'Software',
        link: '/',
        sections: [
          {
            name: 'Experience',
            node: 'node',
            isFoundInPage: true,
          },
          {
            name: 'Skills',
            node: 'node',
            isFoundInPage: true,
          },
          {
            name: 'Contact',
            node: 'node',
            isFoundInPage: true,
          },
        ],
      },
      {
        name: 'art',
        link: '/art',
        sections: [
          {
            name: 'Gallery',
            link: '/art',
            isFoundInPage: false,
          },
        ],
      },
    ]

    const sectionsInPage = [
      { name: 'Experience', node: 'node' },
      { name: 'Skills', node: 'node' },
      { name: 'Contact', node: 'node' },
    ]

    expect(
      constructNavigationWithInPageSections(menuLinks, sectionsInPage)
    ).toEqual(expectedLinks)
  })

  it('creates an array of top level navigation items, with the parent page link when section not found in page', () => {
    const expectedLinks = [
      {
        name: 'Software',
        link: '/',
        sections: [
          {
            name: 'Experience',
            link: '/',
            isFoundInPage: false,
          },
          {
            name: 'Skills',
            link: '/',
            isFoundInPage: false,
          },
          {
            name: 'Contact',
            link: '/',
            isFoundInPage: false,
          },
        ],
      },
      {
        name: 'art',
        link: '/art',
        sections: [
          {
            name: 'Gallery',
            link: '/art',
            isFoundInPage: false,
          },
        ],
      },
    ]

    expect(constructNavigationWithInPageSections(menuLinks, [])).toEqual(
      expectedLinks
    )
  })
})
