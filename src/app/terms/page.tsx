"use client";

import React from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollText, Scale, AlertCircle, HelpCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <MainLayout>
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-amber-50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
              Legal
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">
              Terms of <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400">Service</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Please read these terms carefully before using our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ScrollText className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Agreement</h3>
                <p className="text-sm text-slate-600">
                  Terms you agree to when using our services
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Legal Rights</h3>
                <p className="text-sm text-slate-600">
                  Your rights and responsibilities
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Limitations</h3>
                <p className="text-sm text-slate-600">
                  Service limitations and disclaimers
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Support</h3>
                <p className="text-sm text-slate-600">
                  How to get help with our services
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white border-amber-200 mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Terms of Service</h2>
              <div className="prose max-w-none text-slate-700">
                <p className="mb-4">
                  <strong>Last Updated:</strong> January 1, 2023
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">1. Acceptance of Terms</h3>
                <p>
                  By accessing or using VocateAI's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">2. Use License</h3>
                <p>
                  Permission is granted to temporarily use VocateAI's services for personal, non-commercial purposes only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Modify or copy the materials;</li>
                  <li>Use the materials for any commercial purpose;</li>
                  <li>Attempt to decompile or reverse engineer any software contained on VocateAI's platform;</li>
                  <li>Remove any copyright or other proprietary notations from the materials; or</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                </ul>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">3. Account Registration</h3>
                <p>
                  To access certain features of the service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">3. Account Registration</h3>
                <p>
                  To access certain features of the service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">4. Disclaimer</h3>
                <p>
                  The materials on VocateAI's platform are provided on an 'as is' basis. VocateAI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p className="mt-2">
                  Further, VocateAI does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">5. Limitations</h3>
                <p>
                  In no event shall VocateAI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on VocateAI's platform, even if VocateAI or a VocateAI authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">6. Accuracy of Materials</h3>
                <p>
                  The materials appearing on VocateAI's platform could include technical, typographical, or photographic errors. VocateAI does not warrant that any of the materials on its platform are accurate, complete, or current. VocateAI may make changes to the materials contained on its platform at any time without notice. However, VocateAI does not make any commitment to update the materials.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">7. Links</h3>
                <p>
                  VocateAI has not reviewed all of the sites linked to its platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by VocateAI of the site. Use of any such linked website is at the user's own risk.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">8. Modifications</h3>
                <p>
                  VocateAI may revise these terms of service for its platform at any time without notice. By using this platform, you are agreeing to be bound by the then current version of these terms of service.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">9. Governing Law</h3>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">10. User Content</h3>
                <p>
                  Our service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, or other material. You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">11. Termination</h3>
                <p>
                  We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the terms.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">12. Contact Us</h3>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> legal@vocateai.tech<br />
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