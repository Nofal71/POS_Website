import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative">
            <div className="overflow-hidden -z-50 absolute w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]">
                <img
                    src='https://img.freepik.com/free-photo/paper-bags-different-colors-blue-background-top-view_169016-43755.jpg'
                    alt={'image'}
                    className="object-cover w-full h-full"
                    loading='lazy'
                />
            </div>
            <motion.div
                initial={{ x: -800 }}
                animate={{ x: 0 }}
                transition={{ duration: 1, ease: 'easeIn' }}
                className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-start px-24 ">
                <div className="flex flex-col gap-6">
                    <motion.h1
                        initial={{ overflow: 'hidden', width: '0', opacity: 0 }}
                        animate={{ width: 'auto', opacity: 1}}
                        transition={{ delay: 1, duration: 3, ease: 'easeInOut' }}
                        className="text-3xl text-textPrimary sm:text-4xl lg:text-5xl text-nowrap font-bold text-animation"
                    >
                        ELEVATE YOUR SPACE <br /> WITH OUR FURNITURE
                    </motion.h1>

                    <p className="text-sm sm:text-base text-gray-700">
                        Discover high-quality furniture <br /> crafted for comfort and style.
                    </p>
                    <button className='btn btn-primary w-32'>
                        Shop Now
                    </button>
                </div>
            </motion.div>

        </div>
    );
};

export default Hero;
