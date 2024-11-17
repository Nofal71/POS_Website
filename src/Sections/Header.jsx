import React, { useEffect, useState } from 'react'
import Navbar from '../Components/NavBar'
import Hero from '../Components/Hero'

const Header = () => {

    const [isScrolled, setIsScrolled] = useState(false);

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
            <Navbar bg={isScrolled && 'white' } />
            <Hero />
        </>
    )
}

export default Header
