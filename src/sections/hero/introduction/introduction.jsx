import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { map, defaultTo } from 'ramda'
import classNames from 'classnames'
import { Text } from 'components'
import { mapElementsToComponents } from 'lib/utils/map-element-to-component'
import styles from './introduction.module.scss'

const Introduction = ({
  className,
  introduction: { mainContentBody, introductionAdditionalContent },
}) => (
  <div className={classNames(className, styles.introductionWrapper)}>
    <Text>{ReactHtmlParser(mainContentBody.childMarkdownRemark.html)}</Text>
    <div className={styles.additionalIntroductionContent}>
      {map(
        ({ additionalContentItem }) => (
          <div className={styles.additionalContentItem}>
            {mapElementsToComponents(
              additionalContentItem.childMarkdownRemark.htmlAst,
              { text: styles.text }
            )}
          </div>
        ),
        defaultTo([], introductionAdditionalContent)
      )}
    </div>
  </div>
)

Introduction.propTypes = {
  className: PropTypes.string,
}

export default Introduction
