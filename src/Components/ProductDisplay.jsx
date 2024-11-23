import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import useFetch from '../Hooks/useFetch';
import useFeedback from '../Hooks/useFeedback';
import Login from '../Sections/Authentication/Login';
import Register from '../Sections/Authentication/Register';

const ProductDisplay = () => {
    const { makeRequest, isFetching } = useFetch();
    const { Alert } = useFeedback();
    const [product, setProduct] = useState(null);
    const location = useLocation();
    const productID = location.state.productId;
    const [LoggingIn, setIsLoggingIn] = useState(false)
    const [isNewUser, setNewUser] = useState(false)

    const handleAddToCart = async () => {
        setIsLoggingIn(true)
        try {
            const cart = await makeRequest('GET', '/carts/8d70');
            const updatedProducts = cart.products.includes(productID)
                ? cart.products
                : [...cart.products, productID];
            await makeRequest('PATCH', '/carts/8d70', { products: updatedProducts });
            Alert('Product added to cart successfully', 'alert-success');
        } catch (error) {
            console.error(error, 'error in cart');
            Alert('Failed to add product to cart', 'alert-error');
        }
    };

    const handleBuyNow = async () => {
        setIsLoggingIn(true)
    }

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
                                    Add to Cart
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
