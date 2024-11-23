import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router';
import ProductCard_2 from '../../Components/ProductCard_2';
import useFetch from '../../Hooks/useFetch';
import useFeedback from '../../Hooks/useFeedback';

const Search = () => {
  const location = useLocation();
  const { makeRequest, isFetching } = useFetch();
  const searchedData = location.state?.stateValue;
  const defaultKeyWord = location.state?.inputRef;
  const [searchKeyword, setSearchKeywords] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const inputRef = useRef(null);
  const productsRef = useRef()
  const { Alert } = useFeedback()


  const handleSearchChange = async (e) => {
    const searchedValue = e.target.value.toLowerCase();
    if (searchedValue.length === 0) {
      setSearchKeywords([]);
      return;
    }
    const res = await makeRequest('GET', 'products')
    const searchResults = !isFetching && res?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchedValue) ||
        item.description.toLowerCase().includes(searchedValue)
    );
    const uniqueKeywords = Array.from(
      new Set(searchResults.map((item) => item.name.toLowerCase()))
    );
    setSearchKeywords(uniqueKeywords);
  };


  const handleSearch = async (searchTerm) => {
    if (typeof searchTerm === 'string') {
      const res = await makeRequest('GET', 'products')
      const searchResults = !isFetching && res.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      !searchResults.length > 0 && Alert('No Such Product Found', 'alert-info')
      setFilteredProducts(searchResults);
      // inputRef.current.value = searchResults[0].name.toLowerCase()
    }
    setSearchKeywords([]);
  };

  const sort = (e) => {
    const value = e.target.value;
    const updatedProducts = [...filteredProducts];

    if (value === 'price-asc') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
      updatedProducts.sort((a, b) => b.price - a.price);
    }
    // Top Offers
    // Free Shipments
    // Sale
    // etc.....
    value !== 'none' ? setFilteredProducts(updatedProducts) : setFilteredProducts(filteredProducts);
  };


  useEffect(() => {
    window.scrollTo({ top: productsRef, behavior: 'instant' })
    if (inputRef) {
      inputRef.current.value = defaultKeyWord
    }
    setFilteredProducts(searchedData || []);
  }, [searchedData, inputRef]);



  return (
    <>
      <div className="relative w-1/2 p-5 pb-0 mx-auto">
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
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 cursor-pointer"
            onClick={() => handleSearch(inputRef.current?.value)}
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        {searchKeyword.length > 0 && (
          <div
            id="search-tooltip"
            role="tooltip"
            className="absolute top-full mt-2 bg-white shadow-md rounded-md w-full p-2 z-10"
          >
            <AnimatePresence>
              {searchKeyword.map((name, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h1
                    onClick={() => handleSearch(name)}
                    className="hover:bg-gray-100 hover:cursor-pointer px-2 py-3"
                    key={i}
                  >
                    {name}
                  </h1>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="p-10 flex justify-between items-start flex-row-reverse">
        <select onChange={sort} className='select select-bordered max-w-sm'>
          <option disabled selected>Sort</option>
          <option value="none">None</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        {/* <h1 className='text-lg' >Search Results For <b> {inputRef.current?.value || defaultKeyWord} </b> : </h1> */}
      </div>

      <div ref={productsRef} className='flex flex-row flex-wrap gap-4 mt-20 justify-center mb-20'>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard_2 product={product} key={index} />
          ))
        ) : isFetching ? (
          <span className="loading loading-spinner p-56 loading-xs"></span>
        ) : (
          <h1 className='p-56'>No Such Product Found</h1>
        )
        }
      </div>
    </>
  );
};

export default Search;
