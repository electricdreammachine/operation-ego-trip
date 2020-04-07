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
    personalProjects: allContentfulProject(
      filter: { isPersonalProject: { eq: true } }
    ) {
      edges {
        node {
          name
          description {
            description
          }
          skillsUsed
          url
          image {
            id
          }
          isPersonalProject
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
