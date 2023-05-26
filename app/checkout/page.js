import React from 'react'
import useCart from '../(store)/store'
import { useRouter } from 'next/navigation'

const page = () => {
    const cart = useCart(state => state.cart)
    const router = useRouter()
    console.log('cart', cart)

    async function checkOutHandler() {
        const lineItems = cart.map(cartItem => {
            return {
                price: cartItem.price_id,
                quantity: 1
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
        router.push(data.session.url)
    }

  return (
    <div className="bg-white h-screen w-screen flex flex-col" >
        <div className="flex justify-center" >
            <h1>Your Cart</h1>
            <h4>Items in cart</h4>
        </div>
    </div>
  )
}

export default page