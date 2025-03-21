"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Create a client component that uses useSearchParams
function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setError('No session ID found');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        console.log("Verifying payment with session ID:", sessionId);
        
        // Verify the payment and update user subscription status
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || 'Failed to verify payment');
        }
        
        setSubscriptionDetails(data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error verifying payment:', err);
        setError(err.message || 'An error occurred while verifying your payment');
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card className="border-amber-200 bg-white shadow-md">
        {loading ? (
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-4"></div>
            <p className="text-amber-800 font-medium">Verifying your payment...</p>
          </CardContent>
        ) : error ? (
          <CardContent className="py-8">
            <div className="text-center">
              <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
              <Button 
                onClick={() => router.push('/pricing')}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                Return to Pricing
              </Button>
            </div>
          </CardContent>
        ) : (
          <>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-amber-800">Payment Successful!</CardTitle>
              <CardDescription>Thank you for your subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-medium text-amber-800 mb-2">Subscription Details</h3>
                <p className="text-slate-700">
                  <span className="font-medium">Plan:</span> {subscriptionDetails?.plan || 'Premium Plan'}
                </p>
                {subscriptionDetails?.nextBillingDate && (
                  <p className="text-slate-700">
                    <span className="font-medium">Next billing date:</span> {new Date(subscriptionDetails.nextBillingDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              <div className="text-center mt-6">
                <p className="text-slate-600 mb-4">
                  You now have access to all premium features. Start exploring your enhanced career journey!
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
              <Button 
                onClick={() => router.push('/profile')}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
              >
                Go to My Profile <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}

// Main component with Suspense boundary
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="border-amber-200 bg-white shadow-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-4"></div>
            <p className="text-amber-800 font-medium">Loading...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}