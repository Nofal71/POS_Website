import React from 'react'
import { FeedbackContext } from './Context/FeedbackContext'
import Alert from './Components/common/Alert'
import Modal from './Components/common/Modal'

const HOC = ({ children }) => {
    return (
        <FeedbackContext>
            <Alert />
            <Modal />
            {children}
        </FeedbackContext>
    )
}

export default HOC
