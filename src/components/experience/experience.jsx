import React, { Component } from 'react'
import { map } from 'ramda'
import { format as formatDate } from 'date-fns'
import styles from './experience.module.scss'
import { Consumer } from '../../store'

const FormattedDate = ({ date }) => (
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
                        return(
                            <ol className={styles.experienceTimeline}>
                               { map(({node: job}) => (<li className={styles.timelineItem}>
                                    <div style={{ 'left': lineOffset + 'px' }}>
                                        <div className={styles.timelineTimePeriod}>
                                            <div className={styles.timelineTimes}>
                                                <FormattedDate date={job.startDate}/>
                                                <div className={styles.timelineDateDivider} />
                                                <FormattedDate date={job.endDate}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.timelineItemDetails}>
                                        <div className={styles.roleDetails}>
                                            <h3 className={styles.employer}>{job.employer}</h3>
                                            <p className={styles.jobTitle}>{job.jobTitle}</p>
                                        </div>
                                        <p className={styles.jobDescription}>{job.description.description}</p>
                                        <div className={styles.projectsWrapper}>
                                            <p className={styles.projectsHeader}>Projects:</p>
                                            <ul className={styles.projectsList}>
                                                {map(project =>
                                                    <li className={styles.projectLinkWrapper}><img src={project.image.file.url} /></li>,
                                                    job.projects
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </li>),
                                jobs)
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