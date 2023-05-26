import React from 'react'
import Stripe from 'stripe'
import ProductCard from '../components/ProductCard'


async function getStripeProducts() {
    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
        apiVersion: '2020-08-27',
    })

    const res = await stripe.products.list({
        limit: 4,
    })
    
    const products = res.data
    return products
}

const page = async () => {
    const products = await getStripeProducts()
    console.log(products)

  return (
    <div className="bg-white text-black w-screen h-full flex flex-col" >
        <div className="flex w-full justify-center items-center pt-24 "  >
            <div className="flex flex-col gap-4 items-center w-[400px] sm:w-[450px] lg:w-[600px]  " >
                <h1 className="font-medium text-2xl lg:text-3xl " >Our Featured Items</h1>
                <h4 className="text-sm text-gray-500 text-center leading-6 lg:text-base " >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, eveniet! Facilis impedit facere corporis beatae  voluptates ducimus.</h4>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-16 md:px-32 lg:px-48 mt-16 gap-4 lg:gap-6 " >
            {
                products.map((product, index) => (
                    <div className="rounded-md" key={index} >
                        <ProductCard product={product} id={index} />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default page