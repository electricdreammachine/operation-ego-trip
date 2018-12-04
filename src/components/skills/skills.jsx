import React, { Component } from 'react'
import { map, sortBy, path, pipe, reverse } from 'ramda'
import styles from './skills.module.scss'
import 'common/assets/images/tree-motif-sprite.svg'
import MaxWidthContainer from '../max-width-container'
import { Consumer } from '../../store'

import SkillGroup from './skill-group'

class Skills extends Component {
    render() {
        const { lineOffset } = this.props
        return (
            <Consumer>
                {({ domain: { skillGroups: {
                    edges: skillGroups
                } } }) => {
                    const sortedGroups = pipe(
                        sortBy(path(['node', 'proficiencyLevel'])),
                        reverse,
                    )(skillGroups)

                    return(
                        <MaxWidthContainer
                            className={styles.skillGroupWrapper}
                        >
                            {
                                map(
                                    (skillGroup) => (
                                    <SkillGroup 
                                        {...skillGroup.node}
                                        className={styles.skillGroup}
                                    />
                                ),
                                    sortedGroups
                                )
                            }
                        </MaxWidthContainer>
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default Skills