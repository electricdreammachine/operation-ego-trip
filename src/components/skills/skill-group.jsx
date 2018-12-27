import React from 'react'
import PropTypes from 'prop-types'

import SkillSet from './skill-set'
import Heading from '../heading'

import styles from './skills.module.scss'

const SkillGroup = ({ proficiencyLevel, skillSet, name, lineOffset }) => (
  <div className={styles.skillGroup}>
    <div>
      <div className={styles.skillGroupProficiencyIconWrapper} style={{ 'left': lineOffset + 'px' }}>
        <svg className={styles.skillGroupProficiencyIcon}>
            <use xlinkHref={`#tree-motif-sprite_proficiency-level-${proficiencyLevel}`} key={`#tree-motif-sprite_${proficiencyLevel}`}/>
        </svg>
        <Heading className={styles.skillGroupHeading}>{name}</Heading>
      </div>
    </div>
    <SkillSet skills={skillSet} />
  </div>
)

SkillGroup.propTypes = {
  proficiencyLevel: PropTypes.number,
  lineOffset: PropTypes.number,
}

export default SkillGroup
