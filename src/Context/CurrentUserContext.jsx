import React, { createContext, useState } from 'react'


export const CurrentUserProvider = createContext()

export const CurrentUserContext = ({ children }) => {

    const [CurrentUser, setCurrentUser] = useState({
        id: null,
        name: null,
        username: null,
        email: null,
        password: null,
        role: null,
        status: null,
        contact: null
    })

    return (
        <CurrentUserProvider.Provider value={{ CurrentUser, setCurrentUser }}>
            {children}
        </CurrentUserProvider.Provider>
    )
}

