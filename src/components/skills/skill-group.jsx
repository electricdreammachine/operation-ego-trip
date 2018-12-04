import React from 'react'
import PropTypes from 'prop-types'

import SkillSet from './skill-set'
import Heading from '../heading'

import styles from './skills.module.scss'

const SkillGroup = ({ proficiencyLevel, skillSet, name }) => (
  <div className={styles.skillGroup}>
      <div className={styles.skillGroupProficiencyIconWrapper}>
        <svg className={styles.skillGroupProficiencyIcon}>
            <use xlinkHref={`#tree-motif-sprite_proficiency-level-${proficiencyLevel}`} key={`#tree-motif-sprite_${proficiencyLevel}`}/>
        </svg>
        <Heading className={styles.skillGroupHeading}>{name}</Heading>
      </div>
      <SkillSet skills={skillSet} />
  </div>
)

SkillGroup.propTypes = {
  proficiencyLevel: PropTypes.number,
}

export default SkillGroup
