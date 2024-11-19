import React from 'react'
import { FeedbackContext } from './Context/FeedbackContext'
import MainRoutes from './Routes/MainRoutes'
import Modal from './Components/common/Modal'
import Alert from './Components/common/Alert'

const HOC = ({ children }) => {
    return (
        <FeedbackContext>
            <MainRoutes>
                <Modal />
                <Alert />
                {children}
            </MainRoutes>
        </FeedbackContext>
    )
}

export default HOC
