import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe publishable key
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51N518zSId25rPpE83TMtcZmPujScJ4JS8tsM7gLKHHsz7Xow6E5AYbTCiQLfAXEFBGfbgVwC3Eqi3Vyil1ExTepT00a9sQbaS3');

// Stripe price IDs for different plans
export const STRIPE_PRICE_IDS = {
  BASIC: 'price_1R5ANgSId25rPpE8BkU1C6Wx', // Free plan
  STANDARD: 'price_1R5AJ5SId25rPpE82jBjVexB', // Replace with your actual Stripe price ID for Standard
  PREMIUM: 'price_1R5AKpSId25rPpE8rNdySQsJ', // Replace with your actual Stripe price ID for Premium
};

// Plan features for display
export const PLAN_FEATURES = {
  BASIC: [
    'Personality Assessment',
    'Basic Career Matches',
    'Limited Skills Assessment',
    'Access to Community Forums'
  ],
  STANDARD: [
    'All Basic Features',
    'Full Skills Assessment',
    '10 Career Recommendations',
    'Basic Learning Paths',
    'Resume Review'
  ],
  PREMIUM: [
    'All Standard Features',
    'Advanced Skills Assessment',
    'Unlimited Career Recommendations',
    'Personalized Learning Paths',
    '1-on-1 Career Coaching Session',
    'Resume Review & Optimization'
  ]
};

// Plan pricing information
// Update the PLAN_PRICING to use the actual Stripe price IDs from STRIPE_PRICE_IDS
export const PLAN_PRICING = {
  BASIC: STRIPE_PRICE_IDS.BASIC,
  STANDARD: STRIPE_PRICE_IDS.STANDARD,
  PREMIUM: STRIPE_PRICE_IDS.PREMIUM
};

// Helper function to create checkout session
// Update this function to include email
export const createCheckoutSession = async (priceId: string, customerId?: string, email?: string) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        customerId,
        email
      }),
    });

    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
  }
};