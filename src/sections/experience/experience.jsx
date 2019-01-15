import React, { Component } from 'react'
import { map, isNil, addIndex } from 'ramda'
import { format as formatDate } from 'date-fns'
import classnames from 'classnames'
import ReactHtmlParser from 'react-html-parser'
import arraySort from 'array-sort'
import { Badge, Heading, Text } from 'components'
import { Consumer } from 'store'

import styles from './experience.module.scss'

const FormattedDate = ({ date }) => isNil(date)
  ? (
    <div className={styles.timelineDate}>
      <span className={styles.timelineDatYear}>
        Present
        </span>
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

class Experience extends Component {
  render() {
    const { lineOffset } = this.props
    return (
      <Consumer>
        {({ domain: { jobs: {
          edges: jobs
        } } }) => {
          const sortedJobs = arraySort(jobs, 'node.startDate', { reverse: true })
          return (
            <ol className={styles.experienceTimeline}>
              {addIndex(map)(({ node: job }, index) => {
                const isCompact = index > 1
                return (
                <li className={classnames(
                  styles.timelineItem,
                  { [styles.timelineItemCompact]: isCompact }
                )}>
                <div>
                  <div className={styles.timelineTimePeriod} style={{ 'left': lineOffset + 'px' }}>
                    <div className={styles.timelineTimes}>
                      <FormattedDate date={job.endDate} />
                      <div className={styles.timelineDateDivider} />
                      <FormattedDate date={job.startDate} />
                    </div>
                  </div>
                </div>
                <div className={styles.timelineItemDetails}>
                  <div className={styles.roleDetails}>
                    <Heading className={styles.employer}>{job.employer}</Heading>
                    <Heading textSized className={styles.jobTitle}>{job.jobTitle}</Heading>
                  </div>
                  <Text className={styles.jobDescription}>{ReactHtmlParser(job.description.childMarkdownRemark.html)}</Text>
                  {
                    !isNil(job.projects) ? 
                    (<div>
                      <Heading textSized className={styles.projectsHeader}>Key project</Heading>
                      <ul className={styles.projectsList}>
                        {map(({ name, description, skillsUsed }) => (
                          <li className={styles.projectLinkWrapper}>
                            <Heading textSized className={styles.jobTitle}>{name}</Heading>
                            <Text> {ReactHtmlParser(description.childMarkdownRemark.html)}</Text>
                            {map(
                              skillName => <Badge>{skillName}</Badge>,
                              skillsUsed
                            )}
                          </li>
                          ),
                          job.projects
                        )}
                      </ul>
                    </div>)
                    : null
                  }
                </div>
              </li>)},
                sortedJobs)
              }
            </ol>
          )
        }
        }
      </Consumer>
    )
  }
}

export default Experience