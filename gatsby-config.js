require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
    menuLinks: [
      {
        name:'Software',
        link:'/',
        sections: [
          'Experience',
          'Skills',
          'Contact'
        ],
      },
      {
        name:'art',
        link:'/art',
        sections: [
          'Gallery',
        ],
      }
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-svg-sprite',
    `gatsby-transformer-json`,
    `gatsby-transformer-remark`,
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
  ],
}
