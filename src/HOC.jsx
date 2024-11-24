import React from 'react'
import { FeedbackContext } from './Context/FeedbackContext'
import Alert from './Components/common/Alert'
import Modal from './Components/common/Modal'
import { CurrentUserContext } from './Context/CurrentUserContext'

const HOC = ({ children }) => {
    return (
        <CurrentUserContext>
            <FeedbackContext>
                <Alert />
                <Modal />
                {children}
            </FeedbackContext>
        </CurrentUserContext>
    )
}

export default HOC
