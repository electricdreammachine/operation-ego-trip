import React from 'react'
import 'common/assets/images/leaf-motif-sprite.svg'
import { Consumer } from '../../../store'
import styles from './pillars.scss'

const PillarsTemplate = () => {
    return (
        <Consumer>
            {({ state: {
                nearestLineToBoundary,
                outerAccentBoundaries: {
                    leftOuterBoundary,
                    rightOuterBoundary,
                },
                innerAccentBoundaries: {
                    leftInnerBoundary,
                    rightInnerBoundary,
                }
            }}) => {
                return (
                    <div className={styles.pillarsTemplate}>
                        <svg className={styles.pillarsTemplateGraphic}>
                            <rect x={leftInnerBoundary} y="0" width={leftOuterBoundary - leftInnerBoundary} height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                            <rect x={rightOuterBoundary} y="0" width={rightInnerBoundary - rightOuterBoundary} height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                            <use xlinkHref={`#leaf-motif-sprite_single-leaf`} />
                            <use xlinkHref={`#leaf-motif-sprite_outlined-leaves`} />
                            <use x={nearestLineToBoundary} xlinkHref={`#leaf-motif-sprite_solid-leaves`} />
                        </svg>
                    </div>
                )}
            }
        </Consumer>
    )
}

export default PillarsTemplate