import React, { useEffect, useState } from 'react';
import Hero from '../../Components/Hero';
import useFetch from '../../Hooks/useFetch';

const Header = () => {
    const { makeRequest, isFetching } = useFetch();
    const [image, setImage] = useState(null);
    const [heroText, setheroText] = useState(null);

    useEffect(() => {
        const getData = async () => {

            try {
                const res = await makeRequest('GET', 'assets/hero');
                setImage(res?.heroImg);
                setheroText(res?.heroText)
            } catch (error) {
                console.error('Failed to fetch hero image:', error);
            }
        };

        getData();
    }, []);

    return (
        <>
            <Hero backgroundImage={image}  heroText={heroText}/>
        </>
    );
};

export default Header;
