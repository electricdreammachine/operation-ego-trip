import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { map } from 'ramda'
import classNames from 'classnames'
import { Consumer } from 'store'
import { Text } from 'components'
import { mapElementToComponent } from './map-element-to-component'
import styles from './introduction.module.scss'


const Introduction = ({ className }) => (
  <Consumer>
    {({ domain: { intro: { edges: [{ node: { mainContentBody, introductionAdditionalContent } }] } } }) =>
      <div className={classNames(className, styles.introductionWrapper)}>
        <Text>
            {ReactHtmlParser(mainContentBody.childMarkdownRemark.html)}
        </Text>
        <div className={styles.additionalIntroductionContent}>
          {map(
            ({ additionalContentItem }) => (
              <div className={styles.additionalContentItem}>
                {map(
                  mapElementToComponent,
                  additionalContentItem.childMarkdownRemark.htmlAst.children
                )}
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
