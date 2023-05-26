// import React, { useEffect } from 'react'
// import useCart from '../(store)/store'
import Stripe from 'stripe'

const page = async (props) => {
    const { searchParams } = props
    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
        apiVersion: '2020-08-27',
    })
    const { price_id } = searchParams
    // const product = useCart(state => state.product)
    // const addItemToCart = useCart(state => state.addItemToCart)
    // const { price, name, description, rating } = product

    // useEffect(() => {
    //     console.log(price_id)
    //     getStripeProduct()
    // }, [price_id])

    async function getStripeProduct() {
        const product = await stripe.products.retrieve(price_id);
        console.log("Product: ", product)
        return product
    }

    const item = await getStripeProduct()
    console.log("ITEM:",item)

    function handleAddToCart() {
        console.log("Added to cart: ", price_id)
        const newItem = {
            quantity: 1,
            price_id,
            name,
            price
        }
        addItemToCart({ newItem }) 
    }

  return (
    <div className="h-screen bg-white text-black" >
        {item?.name}
    </div>
    
  )
}

export default page