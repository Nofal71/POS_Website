import React, { useContext, useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import useFetch from '../../Hooks/useFetch'
import { CurrentUserProvider } from '../../Context/CurrentUserContext'
import { CartCountUpdate } from '../../Context/FeedbackContext'
import useFeedback from '../../Hooks/useFeedback'

const DefaultRoute = () => {
    const { makeRequest } = useFetch()
    const { CurrentUser } = useContext(CurrentUserProvider)
    const { setCartCount } = useFeedback()

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await makeRequest('GET', `carts/${CurrentUser.id}`)
                const products = await res.products;
                setCartCount(products?.length || '0')
            } catch (error) {
                console.error('Failed to Load cart', error);
            }
        }
        !CurrentUser && fetchCart()
    }, [CurrentUser])

    return (
        <>
            <Header />
            <Main />
        </>
    )
}

export default DefaultRoute
