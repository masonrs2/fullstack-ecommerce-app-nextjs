import Navbar from './components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import SupabaseProvider from './supabase-provider'
import Footer from './Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white w-screen `}>
        <SupabaseProvider session={session} >
          <Navbar />
          {children}
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  )
}
