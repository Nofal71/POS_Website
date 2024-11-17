import React from 'react'
import ProductCard_1 from '../Components/ProductCard_1'
import Quote from '../Components/Quote'

const Main = () => {
    return (
        <div className='px-24'>
            <div className='flex justify-between w-full pt-10 mt-28'>
                <h5 className='text-xl text-textPrimary font-medium'>
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
            <div className="w-full flex flex-row justify-center mt-10">
                <button className='btn btn-primary'>
                    Shop Our Collections
                </button>
            </div>
            <Quote />
        </div>
    )
}

export default Main
