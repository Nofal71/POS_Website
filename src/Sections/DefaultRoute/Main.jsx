import React, { useEffect, useRef, useState } from 'react'
import Quote from '../../Components/Quote'
import ProductCard_2 from '../../Components/ProductCard_2'
import useFetch from '../../Hooks/useFetch'
import ProductsCarousel from '../../Components/ProductsCarousel'
import useFeedback from '../../Hooks/useFeedback'
import { useNavigate } from 'react-router'

const Main = () => {
    const navigator = useNavigate()
    const { response, isFetching } = useFetch({ URL: 'http://localhost:3000/products' });
    const { Modal, Alert } = useFeedback()
    const [products, setProducts] = useState([])
    const [searchKeyword, setSearchKeywords] = useState([])
    const [searchedData, setSeachedData] = useState([])
    const inputRef = useRef(null)


    const handleSearchChange = (e) => {
        const searchedValue = e.target.value.toLowerCase()
        if (searchedValue.length === 0) {
            setSearchKeywords([])
            return
        }

        const searchResults = response.filter(
            (item) =>
                item.name.toLowerCase().includes(searchedValue) ||
                item.description.toLowerCase().includes(searchedValue)
        );
        const uniqueKeywords = Array.from(
            new Map(
                searchResults.map((item) => [item.name.toLowerCase(), item])
            ).values()
        );

        setSearchKeywords(uniqueKeywords)
        setSeachedData(searchResults)

    }

    const handleSearch = (e) => {
        if (typeof e === 'string') {
            const searchResults = response.filter(
                (item) =>
                    item.name.toLowerCase().includes(e.toLowerCase()) ||
                    item.description.toLowerCase().includes(e.toLowerCase())
            );

            navigator('/search', { state: { stateValue: searchResults, inputRef: inputRef.current?.value } })
        } else {
            searchedData.length > 0 ? navigator('/search', { state: { stateValue: searchedData, inputRef: inputRef.current?.value } }) : Alert('No Data Found', 'alert-info')
        }

        inputRef.current.value = ''
        setSearchKeywords([])
    }

    useEffect(() => {
        !isFetching && setProducts(response)
    }, [response])

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

            <div className='p-5'>
                <ProductsCarousel data={!isFetching && response.slice(0, 5)} />
            </div>

            <div className="w-full flex flex-row justify-center mt-10">
                <button className='btn btn-primary'>
                    Shop Our Collections
                </button>
            </div>
            <Quote />
            <div className='mt-32'>
                <h1 className='text-4xl font-bold'>All Products</h1>
            </div>


            <div className='w-full flex flex-row justify-between gap-52 pt-11 pl-20 my-4'>

                <div className="relative w-full mx-auto">
                    <label
                        htmlFor="search-input"
                        className="input mx-auto input-bordered flex items-center gap-2 w-full"
                    >
                        <input
                            ref={inputRef}
                            id="search-input"
                            type="text"
                            className="grow"
                            placeholder="Search"
                            aria-controls="search-tooltip"
                            onChange={handleSearchChange}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70 cursor-pointer"
                            onClick={handleSearch}
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                    {
                        searchKeyword.length > 0 && (
                            <div
                                id="search-tooltip"
                                role="tooltip"
                                className="absolute top-full mt-2 bg-white shadow-md rounded-md w-full p-2 z-10"
                            >
                                {searchKeyword && searchKeyword.map((e, i) => (
                                    <h1 onClick={() => handleSearch(e.name)} className='hover:bg-gray-100 hover:cursor-pointer px-2 py-3' key={i}>{e.name}</h1>
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>

            {/* <button onClick={() => Modal({
                component: () => <h1>Hi.......</h1>,
                actions: [
                    { label: 'Continue', className: 'btn-success', handler: () => Alert('Alert Works ', 'info') },
                ]
            })} >Open Modal</button> */}


            <div className='flex flex-row flex-wrap gap-4 mt-20 justify-center'>
                {
                    isFetching ? (
                        <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                        products && products.length > 0 ? (
                            products.map((product, index) => (
                                <ProductCard_2 key={index} product={product} />
                            ))
                        ) : (
                            <p>No products available.</p>
                        )
                    )
                }
            </div>

            <div className="p-12">

                <h2 className="text-2xl font-semibold text-center mb-6">
                    Featured Products
                </h2>
                <ProductsCarousel data={!isFetching && response.slice(0, 5)} />
            </div>
        </div>
    )
}

export default Main
