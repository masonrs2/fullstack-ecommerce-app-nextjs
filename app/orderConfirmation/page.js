

// import React, { useEffect } from 'react'
import Stripe from 'stripe'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import useCart from '../(store)/store'
import PurchasedItems from './PurchasedItems'

const page = async () => {
  // const cart = useCart(state => state.cart)
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
    apiVersion: '2020-08-27',
})

const session = await stripe.checkout.sessions.list()
console.log("SESSIONS", session)

const order = await stripe.checkout.sessions.retrieve(session.data[session.data.length-2].id)
console.log("ORDER", order)

// useEffect(() => {

// }, )

// console.log("ORDER CONF CART", cart)
  return (
    <div className="h-screen w-screen bg-white text-black flex flex-col" >
      <div className="w-full flex flex-row-reverse p-12  md:px-16 lg:px-24" >
        <button className="bg-gray-200/80 text-black p-2 px-3 cursor-pointer active:bg-gray-200 font-medium text-sm lg:text-base " >View Invoice</button>
      </div>

      <div className="flex flex-col justify-center  mx-20 md:mx-24 lg:mx-60 border-b pb-8 border-b-gray-500/30" >
        <div className="w-full flex justify-center " >
          <BsFillCheckCircleFill className="text-green-500 w-8 h-8" />
        </div>
        <h1 className="font-medium text-2xl w-full flex justify-center mt-6 mb-3" >We recieved your order</h1>
        <h2 className="w-full flex justify-center font-light text-gray-500">Your order <span className="font-medium flex mx-1 text-gray-600" >#{order?.created}</span> is completed and being prepared for shipping</h2>
      </div>

      <div className="flex flex-col mt-7 mx-20 md:mx-24 lg:mx-60 border-b pb-7 border-b-gray-500/30 text-gray-600" >
        <div className="flex justify-between  text-sm" >
          <div className="flex flex-col" >
            <h4 className="text-gray-400 font-medium uppercase">Shipping Address</h4>
            <p className="mt-4  " >{order?.customer_details?.name ? order?.customer_details?.name : "Name N/A" }</p>
            <p className="mt-2" >{order?.customer_details?.address?.line1 ? order?.customer_details?.address?.line1 : "123 No Address Provided," }</p>
            <div className="flex gap-1" >
              <p className="">{order?.customer_details?.address?.state ? order?.customer_details?.address?.state : "Unknown" }</p>
              <p className="">{order?.customer_details?.address?.postal_code ? order?.customer_details?.address?.postal_code : "Unknown 00000, USA" }, {order?.customer_details?.address?.country ? order?.customer_details?.address?.country : "USA"}</p>
            </div>
          </div>

          <div className="flex flex-col" >
            <h4 className="text-gray-400 font-medium uppercase">Payment Info</h4>
            <h4 className="mt-4" >Credit Card</h4>
            <h4 className="mt-1" >VISA</h4>
            <h4 className="" >*** 4660</h4>
          </div>

        </div>
      </div>
      
        <div>
          <h3 className="text-sm uppercase text-gray-500 mx-20 md:mx-24 mt-7 lg:mx-60" >Order Items</h3>
          <div flex flex-col gap-2 >
           <PurchasedItems />
          </div>
        </div>
    </div>
  )
}

export default page