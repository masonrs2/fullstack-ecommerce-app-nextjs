import React from 'react'
import Image from 'next/image'
import Testimonials from './Testimonials'
import { cards } from '../../constants/index'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className="h-full" >
        <div className="flex flex-col gap-7 items-center py-28" >
            <h2 className="text-gray-600 text-lg font-medium " >2,157 people have said how good Fruitalicous is</h2>
            <h1 className="text-black font-semibold text-4xl" >What Our Customers Say About Us</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-8 xl:px-16 2xl:px-20 gap-6 xl:gap-8 mb-20"  >
                {
                    cards.map((card, index) => (
                        <Testimonials card={card} index={index} />
                    ))
                }
        </div>

        <Link href="/testimonies">
            <div className="w-full flex justify-center font-semibold cursor-pointer pb-8 hover:scale-105 hover:duration-300  " >
                <h3 className="text-black border-b-[2.5px] pb-1 flex  border-b-black under " >View more reviews by customers</h3>
            </div>
        </Link>
    </div>
  )
}

export default HomePage