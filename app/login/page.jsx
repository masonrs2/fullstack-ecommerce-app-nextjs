"use client"

import React from 'react'
import { useSupabase } from '../supabase-provider' 
import { useRouter } from 'next/navigation'

const page = () => {
    const { supabase, session } = useSupabase()
    const router = useRouter()

    const signInWithGoogle = async () => {
        
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })

        if(error) throw error
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-white ">
          {
          !session ? (
            <button 
              onClick={session ? null : () => signInWithGoogle()}
              className="rounded-full bg-black/30 px-10 py-3 font-semibold active:bg-black/50 text-gray-100 no-underline transition hover:bg-black/2-">
                Sign in with Google
              </button>
          )
          : 
            router.push('/')
          
        }


      </div>
    )
}

export default page