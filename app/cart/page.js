"use client"

import React from 'react'
import useCart from '../(store)/store'
import { useRouter } from 'next/navigation'
import { useGetFromStore } from '@/hooks/zustandHooks'
import { BsTrash3 } from 'react-icons/bs'
import CartItem from './CartItem'

const page = () => {
    const cart = useCart(state => state.cart)
    const emptyCart = useCart(state => state.emptyCart)
    const removeItemFromCart = useCart(state => state.removeItemFromCart)
    const router = useRouter()
    console.log('cart', cart)
    
    // const Cart = useGetFromStore(useCart, (state) => state.cart)
    // console.log('CART!!!', Cart)
    
    async function checkOutHandler() {
        console.log("ITEMS IN CHECKOUT CART", cart)
        const lineItems = cart.map(cartItem => {
            console.log("Cart Item",cartItem?.name)
            return {
                price: cartItem?.newProduct?.default_price,
                quantity: 1,
            }
        })
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lineItems })
        })

        const data = await res.json()
        console.log("CHECKING OUT!!!")
        router.push(data.session.url)
    }
    
  return (
    <div className="bg-white h-screen w-screen flex flex-col text-black" >
        <div className="flex flex-col " >
            <div className="flex justify-between mx-24 mt-16" >
                <h1 className="font-semibold text-xl" >Your Cart</h1>
                <h4>Items in cart</h4>
            </div>

            <div className="flex flex-col " >
                {
                    cart.map((cartItem, index) => (
                        <CartItem cartItem={cartItem} index={index} /> 
                    ))
                }
            </div>
        </div>

        <div className="w-full flex gap-2 justify-center mt-20" >
            <button 
                className="bg-black text-gray-300 w-32 p-2 justify-center rounded-md flex hover:bg-black/80 active:bg-black/60 " 
                onClick={checkOutHandler}
            >Checkout
            </button>
            <button 
                className="bg-black text-gray-300 w-32 p-2 justify-center rounded-md flex hover:bg-black/80 active:bg-black/60 " 
                onClick={emptyCart}
            >Empty Cart
            </button>
        </div>
    </div>
  )
}

export default page