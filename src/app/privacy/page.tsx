"use client";

import React from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <MainLayout>
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-amber-50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
              Privacy Policy
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">
              Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400">Privacy</span> Matters
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              We're committed to protecting your personal information and being transparent about how we use it.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Data Protection</h3>
                <p className="text-sm text-slate-600">
                  Your data is secured with industry-standard encryption
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">No Data Selling</h3>
                <p className="text-sm text-slate-600">
                  We never sell your personal information to third parties
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Transparency</h3>
                <p className="text-sm text-slate-600">
                  Clear information about how your data is used
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Your Control</h3>
                <p className="text-sm text-slate-600">
                  Access, export, or delete your data at any time
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white border-amber-200 mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Privacy Policy</h2>
              <div className="prose max-w-none text-slate-700">
                <p className="mb-4">
                  <strong>Last Updated:</strong> January 1, 2023
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">1. Introduction</h3>
                <p>
                  Welcome to VocateAI ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">2. The Data We Collect</h3>
                <p>
                  We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                  <li><strong>Assessment Data</strong> includes your responses to our career assessment questions, personality profiles, and skills evaluations.</li>
                  <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                  <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
                </ul>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">3. How We Use Your Data</h3>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>To provide personalized career recommendations based on your assessment results.</li>
                  <li>To create and maintain your account.</li>
                  <li>To improve our services and user experience.</li>
                  <li>To communicate with you about our services, updates, and relevant career information.</li>
                  <li>To comply with legal obligations.</li>
                </ul>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">4. Data Security</h3>
                <p>
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">5. Data Retention</h3>
                <p>
                  We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">6. Your Legal Rights</h3>
                <p>
                  Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Request access to your personal data.</li>
                  <li>Request correction of your personal data.</li>
                  <li>Request erasure of your personal data.</li>
                  <li>Object to processing of your personal data.</li>
                  <li>Request restriction of processing your personal data.</li>
                  <li>Request transfer of your personal data.</li>
                  <li>Right to withdraw consent.</li>
                </ul>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">7. Contact Us</h3>
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> privacy@vocateai.tech<br />
                  <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94103
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
}