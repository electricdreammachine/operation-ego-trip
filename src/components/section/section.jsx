import React, { Component, createElement, Fragment, createRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty } from 'ramda'

import SectionHeader from './section-header'

import styles from './section.module.scss'

export class Section extends Component {
  constructor() {
    super()
    this.sectionRef = createRef()
  }

  componentDidMount() {
    this.props.registerSection(this.props.name, this.sectionRef.current)
  }
    
  render() {
    const { children, elementType, className, name } = this.props
    let header = null

    if (!isEmpty(name)) {
        header = (
            <SectionHeader>
                {name}
            </SectionHeader>
        )
    }

    return createElement(
      elementType,
      { className: classnames(styles.section, className), ref: this.sectionRef },
      (
      <Fragment>
          {header}
          {children}
      </Fragment>
      )
    )
  }
}

Section.propTypes = {
    template: PropTypes.string,
    elementType: PropTypes.oneOf(['section', 'header']),
    className: PropTypes.string,
    name: PropTypes.string,
}

Section.defaultProps = {
    template: '',
    elementType: 'section',
    name: '',
}

export default Section