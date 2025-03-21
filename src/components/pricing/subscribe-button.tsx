import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { PLAN_PRICING } from '@/lib/stripe';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe outside of the component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// Use a fixed customer ID for now
const STRIPE_CUSTOMER_ID = 'cus_Rz8zQzmVcLUk5Z';

// Hardcoded price IDs for testing
const PRICE_IDS = {
  STANDARD: 'price_1R5AJ5SId25rPpE82jBjVexB',
  PREMIUM: 'price_1R5AKpSId25rPpE8rNdySQsJ'
};

interface SubscribeButtonProps {
  planType: keyof typeof PLAN_PRICING;
  children: React.ReactNode;
  className?: string;
}

export default function SubscribeButton({ planType, children, className }: SubscribeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscription = async () => {
    if (!session) {
      router.push('/login?callbackUrl=/home');
      return;
    }

    // Don't do anything for the basic plan
    if (planType === 'BASIC') {
      return;
    }

    setIsLoading(true);

    try {
      // Use the hardcoded price IDs for now
      const priceId = PRICE_IDS[planType];
      
      if (!priceId) {
        throw new Error('Invalid plan type');
      }

      // First, create a checkout session on the server
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          customerId: STRIPE_CUSTOMER_ID,
          email: session.user.email,
          mode: 'subscription' // Explicitly set the mode to subscription
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      if (!sessionId) {
        throw new Error('No session ID returned from the server');
      }
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }
      
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe checkout error:', error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout process. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSubscription} 
      disabled={isLoading || planType === 'BASIC'} 
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
}