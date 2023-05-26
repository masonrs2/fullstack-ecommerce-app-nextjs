import React from 'react'
import { BsTrash3 } from 'react-icons/bs'
import useCart from '../(store)/store'
const CartItem = ({ cartItem, index }) => {
    const { price_id } = cartItem?.newProduct
    const removeItemFromCart = useCart(state => state.removeItemFromCart)
    console.log(price_id)
    async function removeItemFromCartHandler() {
    
        removeItemFromCart(price_id)
        console.log('removed item', price_id)
    }

   
  return (
    <div className="flex py-4  justify-between border-t border-t-gray-400/80 mx-24" key={index}>
                            <div className="flex " >
                                <img 
                                    src={cartItem?.newProduct?.images[0]} 
                                    className="object-cover w-20 h-20 rounded-md"
                                />
                                <div className="flex flex-col ml-4" >
                                    <p className="font-semibold" >{cartItem?.newProduct?.name}</p>
                                    <p className="text-sm text-gray-500" >Rating: {cartItem?.newProduct?.rating}</p>
                                </div>

                            </div>
                            <div className="flex items-center gap-8 justify-normal h-full" >
                                <p className="" >Qty: {cartItem?.newProduct?.quantity}</p>
                                <p className="font-medium" >${cartItem?.newProduct?.price}</p>
                                <div 
                                    onClick={'removeItemFromCartHandler'} 
                                    className="cursor-pointer" >
                                        <BsTrash3 className="text-gray-500 hover:text-gray-400 active:text-gray-300" /> 
                                </div>
                            </div>
                               
    </div>
  )
}

export default CartItem