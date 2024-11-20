import React from 'react'
import { FeedbackContext } from './Context/FeedbackContext'
import MainRoutes from './Routes/MainRoutes'

const HOC = ({ children }) => {
    return (
        <FeedbackContext>
            <MainRoutes>
                {children}
            </MainRoutes>
        </FeedbackContext>
    )
}

export default HOC
