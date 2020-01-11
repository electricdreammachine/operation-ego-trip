const { isEmpty } = require('ramda')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  const pageName = page.path.replace(/\//g, '')

  deletePage(page)
  createPage({
    ...page,
    context: {
      pageName: isEmpty(pageName)
        ? 'Software'
        : pageName.charAt(0).toUpperCase() + pageName.slice(1),
    },
  })

  console.log(
    pageName,
    isEmpty(pageName)
      ? 'Software'
      : pageName.charAt(0).toUpperCase() + pageName.slice(1)
  )
}
