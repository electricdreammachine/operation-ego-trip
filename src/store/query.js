import { graphql } from 'gatsby'

export const query = graphql`
  fragment contentQuery on Query {
    site {
      siteMetadata {
        menuLinks {
          name
          link
          sections
        }
      }
    }
    jobs: allContentfulJob {
      edges {
        node {
          employer
          startDate
          endDate
          jobTitle
          description {
            childMarkdownRemark {
              html
            }
          }
          projects {
            name
            description {
              childMarkdownRemark {
                html
              }
            }
            skillsUsed
            url
          }
        }
      }
    }
    skillGroups: allContentfulSkillGroup {
      edges {
        node {
          name
          description {
            childMarkdownRemark {
              html
            }
          }
          proficiencyLevel
          skillSet {
            name
            skills
          }
        }
      }
    }
    featuredProject: allContentfulProject(
      filter: { isFeaturedProject: { eq: true } }
      limit: 1
    ) {
      edges {
        node {
          name
          description {
            childMarkdownRemark {
              htmlAst
            }
          }
          skillsUsed
          url
          image {
            fluid {
              aspectRatio
              srcSet
              src
              sizes
              srcWebp
              srcSetWebp
            }
          }
        }
      }
    }
    art: allContentfulArt {
      pieces: edges {
        piece: node {
          title
          description {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          tools
          fullImage {
            file {
              url
            }
            fluid {
              aspectRatio
              srcSet
              src
              sizes
              srcWebp
              srcSetWebp
            }
          }
        }
      }
    }
    contact: allContentfulContactInformation {
      edges {
        node {
          contactBody {
            childMarkdownRemark {
              html
            }
          }
          contactLinks {
            networkName
            url
            username
          }
        }
      }
    }
  }
  fragment intro on ContentfulIntroductionConnection {
    edges {
      node {
        mainContentBody {
          childMarkdownRemark {
            html
          }
        }
        introductionAdditionalContent {
          additionalContentItem: childContentfulAdditionalIntroductionContentMainContentBodyTextNode {
            childMarkdownRemark {
              htmlAst
            }
          }
        }
      }
    }
  }
`
