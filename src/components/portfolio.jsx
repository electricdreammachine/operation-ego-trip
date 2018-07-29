import React, { Component } from 'react'
import Hero from './hero'
import Section from './section'
import styles from './portfolio.scss'

class Portfolio extends Component {
  constructor() {
    super()
    this.state = {
      lineBoundary: 0,
    }
  }

  setLineBoundary = (lineBoundary) => {
    this.setState({
      lineBoundary,
    })
  }

  render() {
    const { lineBoundary } = this.state

    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <Hero setLineBoundary={this.setLineBoundary} />
        </header>
        <Section lineBoundary={lineBoundary}/>
        <Section
          template="pillars"
          lineBoundary={lineBoundary}
        />
        <footer>
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
          butts <br />
        </footer>
      </div>
    )
  }
}

export default Portfolio
