import { motion } from "framer-motion";


const Navbar = ({ bg }) => {
    return (
        <>
            <motion.div
                initial={{ y: -400 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
                className={`sticky top-0 right-0 left-0 p-5 ${bg === 'white' ? 'bg-theme-light' : 'bg-sky-400'} z-50 text-black sm:flex hidden`}>
                <div className="px-4 w-1/4 flex justify-center">
                    <h1 className="text-lg font-bold">
                        Brand Name
                    </h1>
                </div>
                <div className="px-16 flex justify-center">
                    <select className="bg-transparent">
                        <option>Shop</option>
                    </select>
                </div>
                <div className="mx-auto">
                    <ul className="flex flex-row justify-between gap-5 cursor-pointer">
                        <li className=" hover:text-gray-50">Reviews</li>
                        <li className=" hover:text-gray-50">About</li>
                        <li className=" hover:text-gray-50">Contact</li>
                    </ul>
                </div>
                <div className="mx-auto">
                    <h3>Cart (0)</h3>
                </div>
            </motion.div >
        </>

    );
};

export default Navbar;
