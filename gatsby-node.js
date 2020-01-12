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
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions, plugins }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /requestidlecallback-polyfill/,
            use: loaders.null(),
          },
        ],
      },
      plugins: [
        plugins.define({
          DOMRect: function() {
            return {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: 0,
              height: 0,
              x: 0,
              y: 0,
            }
          },
        }),
      ],
    })
  }
}
