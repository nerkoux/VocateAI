import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth'; // Fixed import
import Stripe from 'stripe';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      return NextResponse.json(
        { error: { message: 'Session ID is required' } },
        { status: 400 }
      );
    }
    
    // Get the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      return NextResponse.json(
        { error: { message: 'Invalid session ID' } },
        { status: 400 }
      );
    }
    
    // Get the current user from the session
    const userSession = await getServerSession();
    
    if (!userSession?.user?.email) {
      return NextResponse.json(
        { error: { message: 'User not authenticated' } },
        { status: 401 }
      );
    }
    
    // Connect to MongoDB
    await dbConnect();
    
    // Determine the plan type based on the price ID
    let planType = 'BASIC';
    
    // Get the price ID from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    const priceId = lineItems.data[0]?.price?.id;
    
    if (priceId === 'price_1R5AJ5SId25rPpE82jBjVexB') {
      planType = 'STANDARD';
    } else if (priceId === 'price_1R5AKpSId25rPpE8rNdySQsJ') {
      planType = 'PREMIUM';
    }
    
    // Update the user's subscription status in the database
    const updatedUser = await User.findOneAndUpdate(
      { email: userSession.user.email },
      { 
        $set: {
          subscriptionStatus: 'active',
          subscriptionPlan: planType,
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
          updatedAt: new Date()
        } 
      },
      { new: true }
    );
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: { message: 'User not found' } },
        { status: 404 }
      );
    }
    
    // Return subscription details
    return NextResponse.json({
      success: true,
      subscription: {
        planName: planType,
        status: 'active',
        currentPeriodEnd: null // We'll set this to null for now
      }
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: { message: 'Internal server error' } },
      { status: 500 }
    );
  }
}