"use client"

import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import useCart from '../(store)/store'

const ProductCard = ({ product }) => {
   const { id: price_id, description, metadata, images, name, default_price } = product
   const { Rating: rating, Price: price, OriginalPrice: original_price } = metadata

   const setProduct = useCart(state => state.setProduct)
   const addItemToCart = useCart(state => state.addItemToCart)
   const cart = useCart(state => state.cart)
   const router = useRouter()

    const truncateText = (text, size) => {
        if(text?.length > size) return text.slice(0, size) + "..."
        else return text
    }

    const onClickHandler = () => {
        const newProduct = {
            name,
            description,
            price_id,
            price,
            rating,
            original_price,
            images,
            default_price
        }

        setProduct({ newProduct })
        console.log("Product to set: ", newProduct)
        router.push(`/product?price_id=${price_id}`)
    }

    const addToCartHandler = () => {
        console.log('Product added to cart:', price_id)

        const newProduct = {
            quantity: 1,
            price_id,
            name,
            description,
            rating,
            images,
            price,
            default_price
        }
        console.log("ADDED TO CART", newProduct)
        addItemToCart({ newProduct })
    }

    console.log("cart: ",cart)

  return (
    
    <div className="flex flex-col cursor-pointer rounded-md " >
        
        <img  
            src={product.images[0]} 
            alt="fruit" 
            className="w-full h-64 object-cover rounded-md"
            onClick={onClickHandler}
        />

            <div className="flex flex-col  items" >
                <div className="flex gap-6 items-center h-full mt-3 justify-between" >
                    <p className="font-medium " >{product.name}</p>
                    <p className="font-medium" >${product.metadata.Price}</p>
                </div>
               <p className="text-gray-400 text-xs my-1" >{truncateText(product.description,60)}</p>
               <p className=" text-sm" >Rating: {product.metadata.Rating}/5.0</p>
            </div>

            <div className='w-full flex items-center justify-center' >
                <button 
                    type="button" 
                    className="bg-black mb-2 mt-6 rounded-full text-gray-200 p-2 text-sm w-32 hover:bg-gray-700 hover:text-gray-200 transition duration-300 ease-in-out active:bg-gray-600 " 
                    onClick={addToCartHandler}
                >
                    Add To Cart
                </button>
            </div>

    </div>
  )
}

export default ProductCard