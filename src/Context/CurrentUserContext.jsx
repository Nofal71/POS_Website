import React, { createContext } from 'react';
import useLocalStorage from '../Hooks/useLocalStorage';

export const CurrentUserProvider = createContext();

export const CurrentUserContext = ({ children }) => {
    
    const [CurrentUser, setCurrentUser] = useLocalStorage('currentUser', {
        id: null,
        name: null,
        username: null,
        email: null,
        password: null,
        role: null,
        status: null,
        contact: null,
    });

    return (
        <CurrentUserProvider.Provider value={{ CurrentUser, setCurrentUser }}>
            {children}
        </CurrentUserProvider.Provider>
    );
};
