import React, { Component } from 'react'
import { map } from 'ramda'
import styles from './experience.module.scss'
import { Consumer } from '../../store'

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
                                    <div className={styles.timelineTimePeriod} style={{ 'left': lineOffset + 'px' }}>
                                        <div className={styles.timelineTimes}>
                                            <span>
                                                {job.startDate}
                                            </span>
                                            <span>
                                                {job.endDate}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.timelineItemDetails}>
                                        <p>{job.employer}</p>
                                        <p>{job.jobTitle}</p>
                                        <p>{job.description.description}</p>
                                        <div>
                                            <p>Projects</p>
                                            <ul>
                                                {map(project =>
                                                    <li>{project.name}</li>,
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