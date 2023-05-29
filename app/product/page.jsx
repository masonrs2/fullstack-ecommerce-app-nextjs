"use client"

import { IoStarSharp } from 'react-icons/io5'
import{ BsCart4 } from 'react-icons/bs'
import useCart from '../(store)/store'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = (props) => {
        const { searchParams } = props
        const { price_id } = searchParams
        const product = useCart(state => state.product)
        const addItemToCart = useCart(state => state.addItemToCart)
        const cart = useCart(state => state.cart)
        const { images, name, description, price, original_price, rating, default_price } = product
        const router = useRouter()
        console.log(product)
        console.log("price_id", price_id)

        const [qty, setQty] = useState(1)

        function addToCartHandler() {
            const newProduct = {
                quantity: 1,
                price_id,
                name,
                description,
                rating,
                images,
                price,
                default_price,
                original_price
            }
            addItemToCart({ newProduct })
            console.log("Added to cart", newProduct?.price_id)
            console.log("cart length: ", cart?.length)
        }

        function decrementCrount() {
            if(qty == 1) return
            setQty(qty-1)
        }

        if(!product?.name) window.location.href = '/'

        async function checkOutHandler() {
            console.log("ITEMS IN CHECKOUT CART", cart)
            const lineItems = cart.map(cartItem => {
                console.log("Cart Item",cartItem?.name)
                return {
                    quantity: 1,
                    price: cartItem?.newProduct?.default_price,
                    
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
    <div className="h-screen bg-white text-black w-screen flex flex-col" >
        <div className="font-medium text-3xl w-full flex justify-center py-12 " >
            {product?.name} (Group of 6)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 px-12" >
            <img 
                src={product?.images[0]} 
                alt="ProductImage" 
                className="w-full md:w-96 lg:w-[750px] h-[500px] object-cover rounded-md"
            />
            <div className="flex flex-col pl-6 mt-12 md:mt-0" >
                <div className="w-full flex pl-20" >
                    <p className="text-gray-400 line-through" ><span className="text-sm h-full justify-center items-center">$</span>{product?.original_price}</p>
                </div>
                <p className="text-blue-500 text-2xl font-medium " ><span className="text-sm pr-2 h-full justify-center items-center">$</span>{product?.price}</p>
                <p className="text-sm text-gray-500 mt-6" >{product?.description}</p>
                <div className="flex mt-6 gap-1 items-center">
                    <IoStarSharp className="text-gray-400/70 text-lg" />
                    <IoStarSharp className="text-gray-400/70 text-lg" />
                    <IoStarSharp className="text-gray-400/70 text-lg" />
                    <IoStarSharp className="text-gray-400/70 text-lg" />
                    <IoStarSharp className="text-gray-400/70 text-lg" />
                    <p className="text-gray-400 ml-1 font-medium" >{product?.rating}</p>
                </div>
                    <p className="mt-5 font-medium">Quantity:</p>
                    <div className="flex gap-1 mt-2 items-center" >
                        <button className="flex justify-center items-center bg-gray-300 rounded-full p-[2px] h-5 w-5 cursor-pointer" onClick={decrementCrount} >-</button>
                        <p className="mx-2">{qty}</p>
                        <button className="flex justify-center items-center bg-gray-300 rounded-full p-[2px] h-5 w-5 cursor-pointer" onClick={() => setQty(qty+1)} >+</button>
                    </div>
                    <div className="flex gap-2 mt-20 text-sm items-center md:mt-44" >
                        <button 
                            className="bg-blue-600 text-gray-200 rounded-md w-44 h-10 justify-center items-center" 
                            onClick={checkOutHandler}
                        >Checkout</button>
                        <div className="" >
                            <button 
                                className="bg-black text-gray-200 rounded-md w-32 h-10 justify-center items-center flex gap-1 px-2  "
                                onClick={addToCartHandler}
                            >
                            Add To Cart<BsCart4 />
                            </button>
                        </div>
                    </div>
            </div>
        </div>

    </div>
    
  )
}

export default page