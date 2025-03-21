import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: Request) {
  try {
    const { priceId, customerId, email, mode = 'subscription' } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: { message: 'Price ID is required' } },
        { status: 400 }
      );
    }

    // Create checkout session parameters
    const params: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      customer_email: !customerId ? email : undefined,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/home`,
      // Do not include payment_intent_data for subscription mode
    };

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: { message: error.message } },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: { message: 'Internal server error' } },
      { status: 500 }
    );
  }
}