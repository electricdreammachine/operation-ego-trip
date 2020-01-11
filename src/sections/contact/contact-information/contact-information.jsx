import React from 'react'
import { map } from 'ramda'
import ReactHtmlParser from 'react-html-parser'
import 'common/assets/images/social-icons-sprite.svg'
import { Text, MaxWidthContainer } from 'components'
import Username from './user-name'
import styles from './contact-information.module.scss'

const ContactInformation = ({ contactInfo }) => (
  <MaxWidthContainer className={styles.contactInfoWrapper} maxHeight>
    <Text className={styles.contactBody}>
      {ReactHtmlParser(contactInfo.contactBody.childMarkdownRemark.html)}
    </Text>
    <div className={styles.socialNetworks}>
      {map(
        ({ networkName, username, url }) => (
          <Text className={styles.socialNetwork}>
            <a href={url}>
              <div className={styles.accountDetails}>
                <span>{networkName}</span>
                <Username username={username} styles={styles} />
              </div>
              <svg className={styles.icon}>
                <use
                  xlinkHref={`#social-icons-sprite_${networkName.toLowerCase()}`}
                  key={networkName}
                />
              </svg>
            </a>
          </Text>
        ),
        contactInfo.contactLinks
      )}
    </div>
  </MaxWidthContainer>
)

export default ContactInformation
