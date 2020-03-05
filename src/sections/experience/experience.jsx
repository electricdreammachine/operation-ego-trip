import React from 'react'
import { map, isNil, addIndex } from 'ramda'
import { format as formatDate } from 'date-fns'
import classnames from 'classnames'
import ReactHtmlParser from 'react-html-parser'
import arraySort from 'array-sort'
import {
  Badge,
  Heading,
  Text,
  MaxWidthContainer,
  AlignedDiamondBlock,
} from 'components'

import styles from './experience.module.scss'

const FormattedDate = ({ date }) =>
  isNil(date) ? (
    <div className={styles.timelineDate}>
      <span className={styles.timelineDatYear}>Present</span>
    </div>
  ) : (
    <div className={styles.timelineDate}>
      <span className={styles.timelineDateMonth}>
        {formatDate(date, 'MMM')}
      </span>
      <span className={styles.timelineDateYear}>
        {formatDate(date, 'YYYY')}
      </span>
    </div>
  )

const Experience = ({ jobs }) => {
  const sortedJobs = arraySort(jobs, 'node.startDate', { reverse: true })
  return (
    <MaxWidthContainer>
      <ol className={styles.experienceTimeline}>
        {addIndex(map)(({ node: job }, index) => {
          const isCompact = index > 1
          return (
            <li
              key={job.employer}
              className={classnames(styles.timelineItem, {
                [styles.timelineItemCompact]: isCompact,
              })}
            >
              <div>
                <AlignedDiamondBlock className={styles.timelineTimePeriod}>
                  <div className={styles.timelineTimes}>
                    <FormattedDate date={job.endDate} />
                    <div className={styles.timelineDateDivider} />
                    <FormattedDate date={job.startDate} />
                  </div>
                </AlignedDiamondBlock>
              </div>
              <div className={styles.timelineItemDetails}>
                <div className={styles.roleDetails}>
                  <Heading className={styles.employer}>{job.employer}</Heading>
                  <Heading textSized className={styles.jobTitle}>
                    {job.jobTitle}
                  </Heading>
                </div>
                <Text className={styles.jobDescription}>
                  {ReactHtmlParser(job.description.childMarkdownRemark.html)}
                </Text>
                {!isNil(job.projects) ? (
                  <div>
                    <Heading textSized className={styles.projectsHeader}>
                      Key project
                    </Heading>
                    <div className={styles.projectsList}>
                      {map(
                        ({ name, description, skillsUsed }) => (
                          <div className={styles.projectLinkWrapper}>
                            <Heading textSized className={styles.jobTitle}>
                              {name}
                            </Heading>
                            <div className={styles.skillsWrapper}>
                              {map(
                                skillName => (
                                  <Badge>{skillName}</Badge>
                                ),
                                skillsUsed
                              )}
                            </div>
                            <Text>
                              {' '}
                              {ReactHtmlParser(
                                description.childMarkdownRemark.html
                              )}
                            </Text>
                          </div>
                        ),
                        job.projects
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </li>
          )
        }, sortedJobs)}
      </ol>
    </MaxWidthContainer>
  )
}

export default Experience
