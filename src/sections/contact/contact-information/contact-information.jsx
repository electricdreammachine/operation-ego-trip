import React, { Component } from 'react'
import { map } from 'ramda'
import ReactHtmlParser from 'react-html-parser'
import 'common/assets/images/social-icons-sprite.svg'
import { Consumer } from 'store'
import { Text, MaxWidthContainer } from 'components'
import styles from './contact-information.module.scss'

const UsernameDisplay = ({ username }) => {
    if (/\w+@/.test(username)) {
        const parts = username.split(/(@)/)

        return(
            <span className={styles.emailAddress}>
                <span>{parts[0]}</span>
                <span>{parts.slice(1, parts.length)}</span>
            </span>
        )
    }

    return (
        <span>{username}</span>
    )
} 

class ContactInformation extends Component {
    render() {
        return (
            <Consumer>
                {({ domain:
                    { contact: 
                        { edges }
                    } }) => {
                        const contactInfo = edges[0].node
                        return(
                            <MaxWidthContainer className={styles.contactInfoWrapper} maxHeight>
                                <Text className={styles.contactBody}>
                                    {ReactHtmlParser(contactInfo.contactBody.childMarkdownRemark.html)}
                                </Text>
                                <div className={styles.socialNetworks}>
                                    {map(
                                        ({ networkName, username, url }) => (
                                            <a className={styles.socialNetwork} href={url}>
                                                <div className={styles.accountDetails}>
                                                    <span>{networkName}</span>
                                                    <Text isLink>
                                                        <UsernameDisplay username={username} />
                                                    </Text>
                                                </div>
                                                <svg className={styles.icon}>
                                                    <use xlinkHref={`#social-icons-sprite_${networkName.toLowerCase()}`} key={networkName}/>
                                                </svg>
                                            </a>
                                        ),
                                        contactInfo.contactLinks
                                    )}
                                </div>
                            </MaxWidthContainer>
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default ContactInformation