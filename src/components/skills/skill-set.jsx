import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { map, isNil, join } from 'ramda'
import styles from './skills.module.scss'
import Heading from '../heading'
import Text from '../text'

const SkillSet = ({ skills }) => {
  if (isNil(skills)) return null

  const groupedSkillSets = map(
    ({ name, skills }) => (
      <Fragment>
        <dd><Heading textSized>{name}</Heading></dd>
        <dt><Text>{join(', ', skills)}</Text></dt>
      </Fragment>
    ),
    skills
  )

  return (
    <dl className={styles.skillSet}>
      {groupedSkillSets}
    </dl>
  )
}

SkillSet.propTypes = {
  skills: PropTypes.array,
}

SkillSet.defaultProps = {
  skills: [],
}

export default SkillSet
