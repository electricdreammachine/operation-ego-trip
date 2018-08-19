import { graphql } from "gatsby";

export const query = graphql`
fragment contentQuery on Query {
    jobs: allContentfulJob {
      edges {
        node {
          employer
          startDate
          endDate
          jobTitle
          description {
            description
          }
          projects {
            name
            description {
              description
            }
            skillsUsed
            url
            image {
              file {
                url
                fileName
                contentType
              }
            }
          }
        }
      }
    }
    personalProjects: allContentfulProject(filter: {isPersonalProject: {eq: true}}) {
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
          }
        }
      }
    }
    contact: allContentfulContactInformation {
      edges {
        node {
          contactBody {
            contactBody
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
`