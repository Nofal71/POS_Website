import React, { useContext, useEffect } from 'react'
import ProductCard_1 from '../Components/ProductCard_1'
import Quote from '../Components/Quote'
import ProductCard_2 from '../Components/ProductCard_2'
import useFetch from '../Hooks/useFetch'
import { AlertContext, ModalContext } from '../Context/FeedbackContext'

const Main = () => {
    const { response, isFetching } = useFetch({ URL: 'http://localhost:3000/products' });
    const { setAlert } = useContext(AlertContext)
    const { setModal } = useContext(ModalContext)

    return (
        <div className='px-24'>
            <div className='flex justify-between w-full pt-10 mt-28'>
                <h5 className='text-xl font-medium'>
                    Explore Luxuary Designs <br /> Upgrade your home
                </h5>
                <h1 className='text-3xl font-semibold leading-relaxed text-theme-dark w-1/2'>
                    Shop Now For Exclusive Deals and  Enjoy Seamless Online Odering
                </h1>
            </div>
            
            <div className='flex flex-row flex-wrap gap-4 mt-20 justify-between'>
                <ProductCard_1 />
                <ProductCard_1 />
                <ProductCard_1 />
            </div>

            <button className='btn' onClick={() => setAlert("Welcome User", 'alert-success')} >Open Alert</button>
            <button className='btn' onClick={() => setModal({
                component: () => <h1>Hi.. This is Modal</h1>,
                actions: [
                    { label: "Confirm", className: "btn-primary", handler: () => setAlert("hurrr............!", 'alert-error') }
                ]
            })} >Open Modal</button>

            <div className="w-full flex flex-row justify-center mt-10">
                <button className='btn btn-primary'>
                    Shop Our Collections
                </button>
            </div>
            <Quote />
            <div className='mt-32'>
                <h1 className='text-4xl font-bold'>All Products</h1>
            </div>

            <div className='w-full flex flex-row justify-end'>
                <select className='select select-bordered max-w-sm'>
                    <option disabled selected>Sort</option>
                    <option>Price</option>
                    <option>Price</option>
                </select>
            </div>

            <div className='flex flex-row flex-wrap gap-4 mt-20 justify-between'>
                {
                    !isFetching ? response.map((product, index) => (
                        <ProductCard_2 key={index} product={product} />
                    )) : (
                        <span className="loading loading-spinner loading-xs"></span>
                    )
                }
            </div>
        </div>
    )
}

export default Main
