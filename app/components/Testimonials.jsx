import React from 'react'
import { AiTwotoneStar } from 'react-icons/ai'
import Image from 'next/image'


const Testimonials = ({ card, index }) => {
  return (
    <div className=" text-black " >
            <div key={index} className="flex flex-col p-8 border border-outline border-black rounded "  >
                <div className="flex gap-1" >
                    <AiTwotoneStar className="text-yellow-400 h-5 w-5 " />
                    <AiTwotoneStar className="text-yellow-400 h-5 w-5 " />
                    <AiTwotoneStar className="text-yellow-400 h-5 w-5 " />
                    <AiTwotoneStar className="text-yellow-400 h-5 w-5 " />
                    <AiTwotoneStar className="text-yellow-400 h-5 w-5 " />
                </div>

                 <p className="sm:text-xl md:text-base mt-4" >
                    "{card?.quote}"
                </p>

                <div className="flex gap-3  " >
                    <div className="flex justify-items-center items-center gap-4" >
                        <Image src={card.pfp} className="rounded-full w-[50px] h-[50px] object-cover mt-6" alt={"card"} />
                        <div className="flex flex-col gap-1" >
                            <p className="font-semibold mt-8 " >{card.name}</p>
                            <p className="text-gray-500 w-32" >{card.title}r</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Testimonials