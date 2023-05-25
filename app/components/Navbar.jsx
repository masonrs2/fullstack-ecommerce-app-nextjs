"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import logo from '../../constants/assets/logo.png'
import Link from 'next/link'
import { useSupabase } from '../supabase-provider'
import { useRouter } from 'next/navigation'
import { FaRegUser } from 'react-icons/fa'

const Navbar = () => {
    const { supabase, session } = useSupabase()
    const router = useRouter()

    async function signOut() {
        const { error } = await supabase.auth.signOut()

        if(error) throw error
        router.push('/login')
        
    }

    useEffect(() => {
        if(!session) router.push('/login')
    }, [session])

  return (
    <div className="bg-white text-black p-4 px-10 lg:pl-16 xl:pl-20 flex items-center justify-between " >
        <div className="flex items-center">
            <div className="flex gap-3 items-center pr-12 " >
                <Link href='/' >
                    <Image src={logo} className="w-8 " alt={"logo"} />
                </Link>
                <h1 className="text-lg font-semibold" >Fruitalicous</h1>
            </div>

            <ul className="hidden text-gray-600 md:flex font-medium text-sm gap-8 lg:gap-12 cursor-pointer" >
                
                    <li className="hover:text-gray-500" >
                        <Link href={'/'} >
                            Market
                        </Link>
                    </li>
                    <li className="hover:text-gray-500" >
                        <Link href={'/'} >
                            Testimonies
                        </Link>
                    </li>
                    <li className="hover:text-gray-500" >
                        <Link href={'/'} >
                            About Us
                        </Link>
                    </li>
            </ul>
        </div>

        {
            session ? (
                <div className="flex gap-4 justify-center items-center text-sm" >
                    <div className="flex gap-2  text-gray-600 hover:text-gray-500 justify-center items-center" >
                        <FaRegUser className="w-4 h-4 lg:w-5 lg:h-5" />
                        <h4 className="cursor-pointer font-medium" >Account</h4>
                    </div>
                    <button 
                        type="button" 
                        className="bg-black text-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800 hover:text-gray-200 transition duration-300 ease-in-out active:bg-gray-700"
                    >   Sign Out
                    </button>
                </div>
            ) 
            : (

                <div className="flex gap-4 justify-center items-center text-sm" >
                    <h4 className="cursor-pointer font-medium text-gray-600 hover:text-gray-500" >Customer Login</h4>
                    <button 
                        type="button" 
                        className="bg-black text-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800 hover:text-gray-200 transition duration-300 ease-in-out"
                        onClick={signOut}
                    >   Sign Up
                    </button>
                </div>
            )
        }
    </div>
  )
}

export default Navbar