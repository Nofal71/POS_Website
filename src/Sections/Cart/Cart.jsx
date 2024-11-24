import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../Hooks/useFetch'
import { CurrentUserProvider } from '../../Context/CurrentUserContext'
import ProductCard_2 from '../../Components/ProductCard_2'
import Login from '../Authentication/Login'
import Register from '../Authentication/Register'
import useFeedback from '../../Hooks/useFeedback'

const Cart = () => {

    const [cart, setCart] = useState(null)
    const [LoggingIn, setIsLoggingIn] = useState(false)
    const [isNewUser, setNewUser] = useState(false)
    const { makeRequest } = useFetch()
    const { CurrentUser } = useContext(CurrentUserProvider)
    const { Alert, setCartCount } = useFeedback()
    const fetchProducts = async (productIds) => {
        try {
            let products = []
            productIds?.map(async (id) => {
                const product = await makeRequest('GET', `products/${id}`)
                products.push(product)
            })
            setCart(products)
        } catch (error) {
            console.error('failed to load products', error);
        }
    }

    useEffect(() => {

        const fetchCart = async () => {
            try {
                const res = await makeRequest('GET', `carts/${CurrentUser.id}`)
                const productIds = await res.products;
                fetchProducts(productIds)
                setCartCount(productIds?.length)
            } catch (error) {
                Alert('Your Cart is Empty', 'alert-warning')
                console.error('Failed to Load cart', error);
            }
        }

        if (!CurrentUser?.id) {
            setIsLoggingIn(true)
        } else {
            fetchCart()
        }

    }, [CurrentUser])

    return (
        <>
            <div className='flex flex-row flex-wrap gap-4 mt-20 justify-center'>

                {
                    !CurrentUser?.id && LoggingIn && (
                        <Login open={LoggingIn} setOpen={setIsLoggingIn} setNewUser={setNewUser} />
                    )

                }
                {
                    !CurrentUser?.id && isNewUser && (
                        <Register open={isNewUser} setOpen={setNewUser} setIsLoggingIn={setIsLoggingIn} />
                    )
                }

                {
                    (
                        cart && (
                            cart.map((product, index) => (
                                <ProductCard_2 key={index} product={product} />
                            ))
                        )
                    )
                }
            </div>

        </>
    )
}

export default Cart
