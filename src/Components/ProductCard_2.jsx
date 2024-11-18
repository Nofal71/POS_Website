import React from 'react'
import { motion } from 'framer-motion'

const ProductCard_2 = ({ product }) => {
    return (
        <>
            {
                product && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: .5, ease: 'easeIn' }}
                        className="card bg-base-100 w-1/5">
                        <figure className="w-full">
                            {
                                product.img.includes('.jpg' || '.png' || '.jpeg') ? (
                                    <motion.img
                                        whileHover={{ scale: 1.08, cursor: 'pointer' }}
                                        transition={{ duration: .5, ease: 'easeIn' }}
                                        src={product.img}
                                        alt="Shoes"
                                        className="rounded-xl aspect-square" />
                                ) : (
                                    <div className="skeleton w-full h-full aspect-square"></div>
                                )}
                        </figure>
                        <div className="card-body px-0 w-full">
                            <div className="flex flex-row justify-between items-end">
                                <h2 className="font-semibold text-nowrap overflow-hidden text-ellipsis whitespace-nowrap flex-grow ">{product.name}</h2>
                                <p className="text-sm ml-auto text-nowrap overflow-hidden flex-grow-0 text-ellipsis whitespace-nowrap ">{product.price} {product.currency} </p>
                            </div>
                            <p className="text-sm text-nowrap overflow-hidden text-ellipsis whitespace-nowrap">
                                {product.description}
                            </p>
                        </div>
                    </motion.div>
                )
            }

        </>
    )
}

export default ProductCard_2
