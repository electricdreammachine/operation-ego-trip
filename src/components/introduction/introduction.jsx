import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'ramda'
import classNames from 'classnames'

import styles from './introduction.module.scss'

import { Consumer } from '../../store'

const Introduction = ({ className }) => (
    <Consumer>
        {({ domain: { intro: { edges: [{ node: { mainContentBody, introductionAdditionalContent } }] } } }) =>
            <div className={classNames(className, styles.introductionWrapper)}>
                {mainContentBody.mainContentBody}
                <div className={styles.additionalIntroductionContent}>
                    {map(
                        ({ additionalContentItem }) => (
                            <div className={styles.additionalContentItem}>
                                {additionalContentItem.mainContentBody}
                            </div>
                        ),
                        introductionAdditionalContent
                    )}
                </div>
            </div>
        }
    </Consumer>
)

Introduction.propTypes = {
    className: PropTypes.string,
}

export default Introduction
