import React, { createContext, useState } from 'react'

export const ModalContext = createContext()
export const AlertContext = createContext()
export const CartCountUpdate = createContext()

export const FeedbackContext = ({ children }) => {
    const [openModal, setModalopen] = useState(false)
    const [modalContent, setModalContent] = useState(false)
    const [cartCount, setCartCount] = useState('0')
    const setModal = (modalContent) => {
        setModalopen(!openModal)
        setModalContent(modalContent || 'Nothing here')
    }


    const [Alert, setAlertContent] = useState({ message: '', type: '' });
    const [openAlert, setAlertOpen] = useState(false);

    const setAlert = (message, type) => {
        setAlertContent({ message, type });
        setAlertOpen(true);
    };

    const closeAlert = () => setAlertOpen(false);

    return (
        <ModalContext.Provider value={{ setModal, openModal, modalContent }}>
            <AlertContext.Provider value={{ setAlert, openAlert, Alert, closeAlert }}>
                <CartCountUpdate.Provider value={{ cartCount, setCartCount }}>
                    {children}
                </CartCountUpdate.Provider>
            </AlertContext.Provider>
        </ModalContext.Provider>
    )
}

