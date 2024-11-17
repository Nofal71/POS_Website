import React from 'react'
import { motion } from 'framer-motion'

const ProductCard_1 = ({ product }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: .5, ease: 'easeIn' }}
            className="card bg-base-100 w-96">
            <figure className="w-full">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p className="text-sm">details....</p>
            </div>
        </motion.div>
    )
}

export default ProductCard_1
