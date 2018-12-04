import { graphql } from "gatsby";

export const query = graphql`
fragment contentQuery on Query {
    intro: allContentfulIntroduction {
      edges {
        node {
          mainContentBody {
            mainContentBody
          }
        introductionAdditionalContent {
          additionalContentItem: childContentfulAdditionalIntroductionContentMainContentBodyTextNode {
            mainContentBody
          }
        }
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
    skillGroups: allContentfulSkillGroup {
      edges {
        node {
          name
          description: childContentfulSkillGroupDescriptionTextNode {
            string: description
          }
          proficiencyLevel
          skillSet {
            name
            skills
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
`