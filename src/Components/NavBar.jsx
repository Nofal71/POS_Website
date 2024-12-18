import React, { useEffect, useState } from 'react'
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router';
import useFeedback from '../Hooks/useFeedback';
import useLocalStorage from '../Hooks/useLocalStorage';


const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const { cartCount } = useFeedback()
    const navigate = useNavigate()

    const [theme, setTheme] = useLocalStorage('theme', 'luxury');

    const toggleTheme = () => {
        const newTheme = theme === 'luxury' ? 'light' : 'luxury';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <motion.div
                initial={{ y: -400 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
                className={`sticky navbar top-0 right-0 left-0 p-5 ${isScrolled ? 'bg-theme-light' : 'bg-sky-400'} z-40 text-black items-center`}>
                <div className="navbar-start ">

                    <div className="dropdown sm:hidden">
                        <div role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                            <div tabIndex={0} className="dropdown dropdown-bottom">
                                <ul
                                    tabIndex={0}
                                    className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div onClick={() => navigate('/')} className="px-4 cursor-pointer flex-1 flex justify-start">
                        <h1 className="text-lg font-bold">
                            Brand Name
                        </h1>
                    </div>
                    <div className="px-auto hidden sm:flex justify-center">
                        <div className="dropdown dropdown-bottom">
                            <div tabIndex="0" role="button" className="btn btn-ghost rounded-btn">Shop</div>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="mx-auto">
                    <ul className="flex-row justify-between gap-5 hidden sm:flex cursor-pointer">
                        <li className=" hover:text-gray-50">Reviews</li>
                        <li className=" hover:text-gray-50">About</li>
                        <li className=" hover:text-gray-50">Contact</li>
                    </ul>
                </div>
                <div className="mx-auto cursor-pointer flex gap-7">
                    <Badge badgeContent={cartCount}>
                        <ShoppingCart onClick={() => {
                            navigate('/cart')
                        }} />
                    </Badge>
                    <label className="swap swap-rotate">
                        <input
                            type="checkbox"
                            className="theme-controller"
                            onChange={toggleTheme}
                            checked={theme === 'luxury'}
                        />
                        <svg
                            className="swap-off h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        <svg
                            className="swap-on h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </div>
            </motion.div >
        </>

    );
};

export default Navbar;
