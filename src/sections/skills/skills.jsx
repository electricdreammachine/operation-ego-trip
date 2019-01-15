import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map, sortBy, path, pipe, reverse } from 'ramda'
import 'common/assets/images/tree-motif-sprite.svg'
import { MaxWidthContainer } from 'components'
import { Consumer } from 'store'

import styles from './skills.module.scss'
import SkillGroup from './skill-group'

class Skills extends Component {
    render() {
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
                                        lineOffset={this.props.lineOffset}
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

Skills.propTypes = {
    lineOffset: PropTypes.number,
}

export default Skills