import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import useFetch from '../Hooks/useFetch';
import useFeedback from '../Hooks/useFeedback';
import Login from '../Sections/Authentication/Login';
import Register from '../Sections/Authentication/Register';
import { CurrentUserProvider } from '../Context/CurrentUserContext';

const ProductDisplay = () => {
    const { makeRequest, isFetching } = useFetch();
    const { Alert, setCartCount } = useFeedback();
    const [product, setProduct] = useState(null);
    const location = useLocation();
    const productID = location.state.productId;
    const [LoggingIn, setIsLoggingIn] = useState(false)
    const [isNewUser, setNewUser] = useState(false)
    const { CurrentUser } = useContext(CurrentUserProvider)

    const handleAddToCart = async () => {
        try {
            if (!CurrentUser.id) {
                setIsLoggingIn(true);
                return;
            }
            let cart;
            try {
                cart = await makeRequest('GET', `carts/${CurrentUser.id}`);
            } catch (error) {
                console.warn('Cart not found, creating a new cart.');
            }

            if (!cart) {
                cart = await makeRequest('POST', '/carts', {
                    id: CurrentUser.id,
                    products: [productID],
                });

                setCartCount(1);
                Alert('Cart created and item added successfully!', 'alert-success');
            } else {
                if (cart?.products?.includes(productID)) {
                    Alert('Already in Cart', 'alert-warning')
                    return
                }
                const updatedProducts = [...cart.products, productID];
                await makeRequest('PATCH', `/carts/${CurrentUser.id}`, { products: updatedProducts });
                setCartCount(updatedProducts.length);
                Alert('Item added to cart successfully!', 'alert-success');
            }
        } catch (error) {
            console.error('Error handling cart:', error);
            Alert('Failed to add product to cart. Please try again later.', 'alert-error');
        }
    };


    const handleBuyNow = async () => {
        try {
            if (!CurrentUser?.id) {
                setIsLoggingIn(true);
                return;
            }
    
            let order;
            try {
                order = await makeRequest('GET', `orders/${CurrentUser.id}`);
            } catch {
                console.warn('No existing order found, creating a new one.');
            }
    
            const newOrderDetail = {
                status: "pending",
                product: {
                    id: productID,
                    quantity: 1
                }
            };
    
            if (!order) {
                await makeRequest('POST', '/orders', {
                    id: CurrentUser.id,
                    details: [newOrderDetail]
                });
                Alert('Order placed successfully!', 'alert-success');
            } else {
                const existingProduct = order.details.find(detail => detail.product.id === productID);
                if (existingProduct) {
                    Alert('Order already placed for this product.', 'alert-warning');
                    return;
                }
    
                const updatedDetails = [...order.details, newOrderDetail];
                await makeRequest('PATCH', `orders/${CurrentUser.id}`, { details: updatedDetails });
                Alert('Order placed successfully!', 'alert-success');
            }
        } catch (error) {
            console.error('Error handling order:', error);
            Alert('Failed to place order. Please try again later.', 'alert-error');
        }
    };
    



    useEffect(() => {
        window.scrollTo({ top: 100, behavior: 'instant' })
        const getProduct = async () => {
            try {
                const res = await makeRequest('GET', `products/${productID}`);
                setProduct(res);
            } catch (error) {
                Alert('Failed to load product', 'alert-error');
            }
        };
        getProduct();
    }, [productID]);


    return (
        <div className="flex flex-col min-h-screen bg-base-200">
            {
                LoggingIn && (
                    <Login open={LoggingIn} setOpen={setIsLoggingIn} setNewUser={setNewUser} />
                )
            }
            {
                isNewUser && (
                    <Register open={isNewUser} setOpen={setNewUser} setIsLoggingIn={setIsLoggingIn} />
                )
            }
            <div className="flex-1 flex items-center justify-center p-8">
                {isFetching && product === null ? (
                    <span className="loading loading-spinner p-10"></span>
                ) : (
                    <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 bg-base-100 shadow-lg rounded-lg p-6">
                        <div className="flex justify-center items-center">
                            <img
                                src={product?.img}
                                alt="Product"
                                className="rounded-lg max-h-96 object-cover"
                            />
                        </div>
                        <div className="flex flex-col space-y-6">
                            <h1 className="text-3xl font-bold text-primary">
                                {product?.name}
                            </h1>
                            <p className="text-gray-600 text-lg">
                                {product?.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="badge badge-outline badge-info text-sm px-4 py-2">
                                    Category: {product?.category}
                                </span>
                                <span className="text-lg text-gray-800">
                                    In Stock: {product?.inventory.quantity > 0 ? (
                                        <span className="text-success font-semibold">
                                            {product?.inventory.quantity} available
                                        </span>
                                    ) : (
                                        <span className="text-error font-semibold">
                                            Out of Stock
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="text-xl font-semibold">
                                Price: <span className="text-primary">{product?.currency} {product?.price}</span>
                            </div>
                            <div className="flex space-x-4">
                                <button onClick={handleAddToCart} className="btn btn-primary">
                                    {isFetching ? 'Loading...' : 'Add to Cart'}
                                </button>
                                <button onClick={handleBuyNow} className="btn btn-secondary">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDisplay;
