"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Star, Sparkles, Crown, Zap, Shield, Clock, Users, Rocket } from 'lucide-react';
import SubscribeButton from '@/components/pricing/subscribe-button';
import { PLAN_FEATURES, PLAN_PRICING } from '@/lib/stripe';

// Define interfaces for the pricing structure
interface PlanPrice {
  monthly: number;
  yearly?: number;
}

interface PricingStructure {
  BASIC: PlanPrice;
  STANDARD: PlanPrice;
  PREMIUM: PlanPrice;
}

// Type assertion for PLAN_PRICING with correct pricing values
const typedPlanPricing = {
  BASIC: { monthly: 0 },
  STANDARD: { monthly: 399 },
  PREMIUM: { monthly: 999 }
} as PricingStructure;

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  // Calculate yearly discount
  const getYearlyPrice = (monthlyPrice: number) => {
    return Math.floor(monthlyPrice * 10); // 2 months free
  };

  return (
    <MainLayout>
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-amber-50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
              Pricing
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">
              Choose Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400">Career Journey</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Select the plan that best fits your career development needs
            </p>
          </div>
          
          <div className="flex justify-center mb-10">
            <Tabs 
              defaultValue="monthly" 
              className="bg-white rounded-lg p-1 border border-amber-200 shadow-sm"
              onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
            >
              <TabsList className="grid grid-cols-2 w-[300px]">
                <TabsTrigger 
                  value="monthly"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger 
                  value="yearly"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
                >
                  Yearly <Badge className="ml-1.5 bg-amber-200 text-amber-800 hover:bg-amber-300">Save 16%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Basic Plan */}
            <Card className="border-amber-200 bg-white shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 to-amber-400"></div>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-amber-800">Basic</CardTitle>
                    <p className="text-slate-600 mt-1">Essential career tools</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Rocket className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-800">Free</span>
                  <span className="text-slate-600 ml-1">forever</span>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <ul className="space-y-3">
                  {PLAN_FEATURES.BASIC.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <SubscribeButton planType="BASIC" className="w-full bg-white border-amber-300 text-amber-700 hover:bg-amber-50">
                  Get Started
                </SubscribeButton>
              </CardFooter>
            </Card>
            
            {/* Standard Plan */}
            <Card className="border-amber-300 bg-white shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
              <CardHeader className="pb-4">
                <Badge className="absolute -right-8 top-6 rotate-45 bg-amber-500 text-white px-8 py-1 shadow-sm">
                  Popular
                </Badge>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-amber-800">Standard</CardTitle>
                    <p className="text-slate-600 mt-1">Advanced career guidance</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Star className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-800">₹{billingCycle === 'monthly' 
                    ? typedPlanPricing.STANDARD.monthly 
                    : getYearlyPrice(typedPlanPricing.STANDARD.monthly)}</span>
                  <span className="text-slate-600 ml-1">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <ul className="space-y-3">
                  {PLAN_FEATURES.STANDARD.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <SubscribeButton planType="STANDARD" className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white">
                  Upgrade Now
                </SubscribeButton>
              </CardFooter>
            </Card>
            
            {/* Premium Plan */}
            <Card className="border-amber-300 bg-gradient-to-b from-white to-amber-50 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-amber-800">Premium</CardTitle>
                    <p className="text-slate-600 mt-1">Complete career solution</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Crown className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-800">₹{billingCycle === 'monthly' 
                    ? typedPlanPricing.PREMIUM.monthly 
                    : getYearlyPrice(typedPlanPricing.PREMIUM.monthly)}</span>
                  <span className="text-slate-600 ml-1">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <ul className="space-y-3">
                  {PLAN_FEATURES.PREMIUM.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <SubscribeButton planType="PREMIUM" className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white">
                  Get Premium
                </SubscribeButton>
              </CardFooter>
            </Card>
          </div>
          
          {/* Features Comparison */}
          <div className="bg-white rounded-xl border border-amber-200 shadow-sm p-6 md:p-8 mb-16">
            <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">Feature Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-amber-200">
                    <th className="text-left py-4 px-4 font-medium text-slate-700">Feature</th>
                    <th className="text-center py-4 px-4 font-medium text-slate-700">Basic</th>
                    <th className="text-center py-4 px-4 font-medium text-slate-700">Standard</th>
                    <th className="text-center py-4 px-4 font-medium text-slate-700">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-amber-100">
                    <td className="py-4 px-4 text-slate-700">Personality Assessment</td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-4 px-4 text-slate-700">Skills Assessment</td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-4 px-4 text-slate-700">Career Recommendations</td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-4 px-4 text-slate-700">AI Consultations</td>
                    <td className="py-4 px-4 text-center">5/month</td>
                    <td className="py-4 px-4 text-center">20/month</td>
                    <td className="py-4 px-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-4 px-4 text-slate-700">Advanced Career Insights</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-4 px-4 text-slate-700">Personalized Learning Path</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-4 px-4 text-slate-700">Resume Analysis & Feedback</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center">Basic</td>
                    <td className="py-4 px-4 text-center">Advanced</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-4 px-4 text-slate-700">Resume Analysis & Feedback</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center">Basic</td>
                    <td className="py-4 px-4 text-center">Advanced</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-4 px-4 text-slate-700">Interview Preparation</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center">5/month</td>
                    <td className="py-4 px-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-4 px-4 text-slate-700">Career Path Simulations</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-4 px-4 text-slate-700">Priority Support</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center"><Check className="h-5 w-5 text-amber-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-3">Frequently Asked Questions</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Find answers to common questions about our pricing plans and features
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-amber-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium text-amber-800">
                    How do the billing cycles work?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    You can choose between monthly or yearly billing. Yearly plans offer a 16% discount, equivalent to getting 2 months free compared to monthly billing.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-amber-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium text-amber-800">
                    Can I upgrade or downgrade my plan?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the start of your next billing cycle.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-amber-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium text-amber-800">
                    What payment methods do you accept?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. We also support payment through PayPal.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-amber-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium text-amber-800">
                    Is there a refund policy?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Yes, we offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, you can request a full refund within 14 days of your initial purchase.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-amber-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium text-amber-800">
                    What happens when I reach my consultation limit?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Once you reach your monthly AI consultation limit, you'll need to wait until your next billing cycle for the limit to reset, or you can upgrade to a higher tier plan for more consultations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-amber-200 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium text-amber-800">
                    Do you offer team or enterprise plans?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Yes, we offer custom enterprise solutions for teams and organizations. Please contact our sales team at <span className="text-amber-600">enterprise@aikiosk.com</span> for more information.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* CTA Section */}
          <motion.div 
            className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl p-8 md:p-12 text-center text-white shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Accelerate Your Career?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are using AI Kiosk to discover their ideal career path and reach their full potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-amber-600 hover:bg-amber-50"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Rocket className="h-5 w-5 mr-2" />
                Choose Your Plan
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-amber-600"
                onClick={() => window.open('/consultation', '_blank')}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Try AI Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}