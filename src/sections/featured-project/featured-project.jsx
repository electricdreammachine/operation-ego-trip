import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import 'common/assets/images/tree-motif-sprite.svg'
import { mapElementsToComponents } from 'lib/utils/map-element-to-component'
import {
  MaxWidthContainer,
  AlignedDiamondBlock,
  Heading,
  BadgeList,
} from 'components'
import styles from './featured-project.module.scss'

const FeaturedProject = ({ featuredProject: { node: featuredProject } }) => {
  return (
    <MaxWidthContainer>
      <div className={styles.projectWrapper}>
        <div>
          <AlignedDiamondBlock className={styles.projectImageWrapper}>
            <Img
              className={styles.projectImage}
              fluid={featuredProject.image.fluid}
            />
          </AlignedDiamondBlock>
        </div>
        <div className={styles.projectDetails}>
          <Heading>Work in progress</Heading>
          <Heading className={styles.projectName} textSized>
            {featuredProject.name}
          </Heading>
          <BadgeList listItems={featuredProject.skillsUsed} />
          {mapElementsToComponents(
            featuredProject.description.childMarkdownRemark.htmlAst,
            {
              text: styles.projectDetailsText,
              heading: styles.projectDetailsHeading,
            }
          )}
        </div>
      </div>
    </MaxWidthContainer>
  )
}

FeaturedProject.propTypes = {
  featuredProject: PropTypes.object,
}

FeaturedProject.defaultProps = {
  featuredProject: {},
}

export default FeaturedProject
