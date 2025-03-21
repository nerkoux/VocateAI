import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();
    
    // Create a customer portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err: any) {
    console.error('Error creating portal session:', err);
    return NextResponse.json({ error: { message: err.message } }, { status: 500 });
  }
}