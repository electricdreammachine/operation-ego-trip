import React, { Component } from 'react'
import { map } from 'ramda'
import { Consumer } from 'store'
import { MaxWidthContainer } from 'components/'

import styles from './art.module.scss'

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
                                        <img src={piece.fullImage.file.url} alt={piece.title} />
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