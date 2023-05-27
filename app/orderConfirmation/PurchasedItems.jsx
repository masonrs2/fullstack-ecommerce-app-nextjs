"use client"

import React from 'react'
import useCart from '../(store)/store'

const PurchasedItems = () => {
    const cart = useCart(state => state.cart)

    const truncateText = (text, size) => {
        if(text?.length > size) return text.slice(0, size) + "..."
        else return text
    }

    return (
        <div>
            {
                cart.map((cartItem, index) => (
                    <div className="mt-8 mx-20 md:mx-24 lg:mx-60  border-b pb-7 border-b-gray-500/30 text-gray-600 flex justify-between" key={index} >
                        <div className="flex gap-4 flex-between " >

                            <img 
                                src={cartItem?.newProduct?.images[0]} 
                                className="object-cover w-20 h-20 lg:w-28 lg:h-28 rounded-md" 
                            />

                            <div className="flex flex-col " >
                                <p className="text-black font-semibold " >{cartItem?.newProduct?.name}</p>
                                <p className="hidden md:flex text-xs text-gray-500 w-[500px] mt-1 " >{truncateText(cartItem?.newProduct?.description, 120)}</p>
                                <p className="md:hidden text-xs text-gray-500 mt-1 " >{truncateText(cartItem?.newProduct?.description, 30)}</p>
                                <p className="text-sm font-semibold mt-1" >Qty: 1</p>
                            </div>
                        </div>
                            <p className="font-semibold  ">${cartItem?.newProduct?.price}</p>

                    </div>
                ))
                }
        </div>
    )
}

export default PurchasedItems