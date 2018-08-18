import React, { Component, Fragment } from 'react'
import { map } from 'ramda'
// import 'common/assets/images/social-icons-sprite.svg'
// import styles from './contact-information.module.scss'
import { Consumer } from '../../store'

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
                            <Fragment>
                                <div>
                                    {contactInfo.contactBody.contactBody}
                                </div>
                                {map(
                                    ({ networkName, username, url }) => (
                                        <a href={url}>{networkName} {username}</a>
                                    ),
                                    contactInfo.contactLinks
                                )}
                            </Fragment>
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default ContactInformation