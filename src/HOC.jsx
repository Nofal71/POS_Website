import React from 'react'
import { FeedbackContext } from './Context/FeedbackContext'

const HOC = ({ children }) => {
    return (
        <FeedbackContext>
            {children}
        </FeedbackContext>
    )
}

export default HOC
