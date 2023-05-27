import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request) {
    const body = await request.json()

    if(body.lineItems.length === 0) {
        return new Response('No items in cart', {
            status: 405,
        })
    }

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET ?? "", {
            apiVersion: '2020-08-27',
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `http://localhost:3000/orderConfirmation`,
            cancel_url: 'http://localhost:3000/cancel',
            line_items: body.lineItems,
            mode: 'payment'
        })

        console.log("SESSSSSIOOON", session)

        return NextResponse.json({ session })

    } catch (error) {
        console.log('error', error)
        return new Response('Errorrr', {
            status: 405,
        });
    }
}