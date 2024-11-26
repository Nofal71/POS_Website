import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import { CurrentUserProvider } from '../../Context/CurrentUserContext';
import ProductCard_2 from '../../Components/ProductCard_2';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import useFeedback from '../../Hooks/useFeedback';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [LoggingIn, setIsLoggingIn] = useState(false);
    const [isNewUser, setNewUser] = useState(false);
    const [loading, setLoading] = useState(null)
    const { makeRequest } = useFetch();
    const { CurrentUser } = useContext(CurrentUserProvider);
    const { Alert, setCartCount, Modal } = useFeedback();


    const fetchProducts = async (productIds) => {
        try {
            const products = await Promise.all(
                productIds?.map(id => makeRequest('GET', `products/${id}`))
            );
            setCart(products);
        } catch {
            Alert('Failed to load products', 'alert-error');
        }
    };

    const removeFromCart = async (productID) => {
        try {
            const res = await makeRequest('GET', `carts/${CurrentUser.id}`);
            const updatedProductIds = res?.products?.filter(id => id !== productID) || [];
            await makeRequest('PATCH', `carts/${CurrentUser.id}`, { products: updatedProductIds });
            setCart(prevCart => prevCart.filter(product => product.id !== productID));
            setCartCount(updatedProductIds.length);
            Alert('Item removed from cart successfully', 'alert-success');
        } catch {
            Alert('Failed to update cart', 'alert-error');
        }
    };

    const ModalComponent = () => {
        return (
            <h2>Confirm to Remove Item From Cart</h2>
        )
    }
    const removeActions = (productID) => ({
        label: loading ? 'loading...' : 'Remove', className: 'btn btn-error', handler: () => removeFromCart(productID)
    })

    const cartActions = (productID) => [
        {
            lable: 'Remove From Cart', className: 'btn btn-error', handler: () => Modal({
                component: ModalComponent,
                actions: [
                    removeActions(productID)
                ]
            })
        }
    ];

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true)
                const res = await makeRequest('GET', `carts/${CurrentUser.id}`);
                const productIds = res?.products || [];
                await fetchProducts(productIds);
                setCartCount(productIds.length);
            } catch {
                Alert('Your Cart is Empty', 'alert-warning');
            } finally {
                setLoading(false)
            }
        };

        if (!CurrentUser?.id) {
            setIsLoggingIn(true);
        } else {
            fetchCart();
        }
    }, [CurrentUser]);

    if (loading) {
        return (
            <progress className="progress mx-auto w-full"></progress>
        );
    }

    return (
        <div className='flex flex-row flex-wrap gap-4 mt-20 justify-center'>
            {!CurrentUser?.id && LoggingIn && (
                <Login open={LoggingIn} setOpen={setIsLoggingIn} setNewUser={setNewUser} />
            )}
            {!CurrentUser?.id && isNewUser && (
                <Register open={isNewUser} setOpen={setNewUser} setIsLoggingIn={setIsLoggingIn} />
            )}
            {cart && cart.map((product, index) => (
                <ProductCard_2 actions={cartActions(product.id)} key={index} product={product} />
            ))}
            {cart && cart.length === 0 && (
                <h1>
                    Your Cart is Empty
                </h1>
            )}
        </div>
    );
};

export default Cart;
