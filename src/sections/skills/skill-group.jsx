import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { pathOr } from 'ramda'
import { Text, Heading } from 'components'

import SkillSet from './skill-set'
import styles from './skills.module.scss'

const SkillGroup = ({ proficiencyLevel, skillSet, name, description, lineOffset }) => (
  <div className={styles.skillGroup}>
    <div>
      <div className={styles.skillGroupProficiencyIconWrapper} style={{ 'left': lineOffset + 'px' }}>
        <svg className={styles.skillGroupProficiencyIcon}>
            <use xlinkHref={`#tree-motif-sprite_proficiency-level-${proficiencyLevel}`} key={`#tree-motif-sprite_${proficiencyLevel}`}/>
        </svg>
        <Heading className={styles.skillGroupHeading}>{name}</Heading>
      </div>
    </div>
    <div className={styles.skillInformationWrapper}>
      <Text className={styles.skillGroupDescription}>
        {ReactHtmlParser(pathOr('', ['childMarkdownRemark' ,'html'], description))}
      </Text>
      <div className={styles.skillSetWrapper}>
        <SkillSet skills={skillSet} />
      </div>
    </div>
  </div>
)

SkillGroup.propTypes = {
  proficiencyLevel: PropTypes.number,
  lineOffset: PropTypes.number,
}

export default SkillGroup
