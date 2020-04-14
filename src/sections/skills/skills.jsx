import React from 'react'
import PropTypes from 'prop-types'
import { map, sortBy, path, pipe, reverse } from 'ramda'
import 'common/assets/images/tree-motif-sprite.svg'
import { MaxWidthContainer } from 'components'

import styles from './skills.module.scss'
import SkillGroup from './skill-group'

const Skills = ({ skillGroups }) => {
  const sortedGroups = pipe(
    sortBy(path(['node', 'proficiencyLevel'])),
    reverse
  )(skillGroups)

  return (
    <MaxWidthContainer className={styles.skillGroupWrapper}>
      {map(
        skillGroup => (
          <SkillGroup {...skillGroup.node} className={styles.skillGroup} />
        ),
        sortedGroups
      )}
    </MaxWidthContainer>
  )
}

Skills.propTypes = {
  skillGroups: PropTypes.array,
}

Skills.defaultProps = {
  skillGroups: [],
}

export default Skills
