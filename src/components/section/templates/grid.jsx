import React, { Component } from 'react'
import { map } from 'ramda'
import { Consumer } from '../../../store'
import MaxWidthContainer from '../../max-width-container'

import styles from './grid.module.scss'

class GridTemplate extends Component {
    render() {
        return (
            <Consumer>
                {({ domain: {
                    art: {
                        pieces
                    }
                }}) => (
                    <MaxWidthContainer>
                        <div className={styles.gridWrapper}>
                            { map(
                                ({ piece }) => (
                                    <div>
                                        <img src={piece.fullImage.file.url} />
                                    </div>
                                ),
                                pieces
                            )}
                        </div>
                    </MaxWidthContainer>
                    )
                }
            </Consumer>
        )
    }
}

export default GridTemplate