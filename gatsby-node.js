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

const postCssLoaderRe = /\/postcss-loader\//
const targetFiles = ['.module.scss', '.scss']

const processRule = rule => {
  if (rule.oneOf) {
    return {
      ...rule,
      oneOf: rule.oneOf.map(processRule),
    }
  }

  // if rule doesn't target one of targetFiles - leave rule untouched
  if (
    !targetFiles.some(targetFile => {
      if (rule.test instanceof RegExp) {
        return rule.test.test(targetFile)
      } else {
        return false
      }
    })
  ) {
    return rule
  }

  if (Array.isArray(rule.use)) {
    return {
      ...rule,
      use: rule.use.map(use => {
        if (!postCssLoaderRe.test(use.loader)) {
          // if it's not postcss loader - leave loader untouched
          return use
        }

        return {
          ...use,
          options: {
            ...use.options,
            plugins: loader => {
              const result = use.options.plugins(loader)

              return result.map(postCssPlugin => {
                if (postCssPlugin.postcssPlugin === `autoprefixer`) {
                  // modify `postCssPlugin.options` here
                  postCssPlugin.options.grid = `autoplace`
                }

                return postCssPlugin
              })
            },
          },
        }
      }),
    }
  }

  return rule
}

exports.onCreateWebpackConfig = ({
  getConfig,
  stage,
  loaders,
  actions,
  plugins,
}) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
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

  const config = getConfig()

  const newConfig = {
    ...config,
    module: {
      ...config.module,
      rules: config.module.rules.map(processRule),
    },
  }
  actions.replaceWebpackConfig(newConfig)
}
