"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle, MessageCircle, Mail, ArrowRight } from 'lucide-react';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample FAQ data
  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      faqs: [
        {
          id: 'what-is-vocateai',
          question: 'What is VocateAI?',
          answer: 'VocateAI is an AI-powered career guidance platform that helps individuals discover suitable career paths, develop necessary skills, and connect with opportunities based on their unique abilities, interests, and goals.'
        },
        {
          id: 'how-does-it-work',
          question: 'How does VocateAI work?',
          answer: 'VocateAI uses advanced artificial intelligence to analyze your skills, interests, personality traits, and career goals. It then provides personalized recommendations, learning resources, and guidance to help you navigate your career journey effectively.'
        },
        {
          id: 'is-it-free',
          question: 'Is VocateAI free to use?',
          answer: 'VocateAI offers a free basic plan with limited features. We also offer premium plans with additional features and personalized guidance for a monthly subscription fee. You can view our pricing details on the pricing page.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Settings',
      faqs: [
        {
          id: 'create-account',
          question: 'How do I create an account?',
          answer: 'To create an account, click on the "Sign Up" button in the top right corner of the homepage. You can sign up using your email address, or through Google or LinkedIn authentication. Follow the prompts to complete your profile setup.'
        },
        {
          id: 'delete-account',
          question: 'How can I delete my account?',
          answer: 'To delete your account, go to your Account Settings, scroll to the bottom of the page, and click on "Delete Account". Please note that this action is irreversible and all your data will be permanently removed from our system.'
        },
        {
          id: 'change-password',
          question: 'How do I change my password?',
          answer: 'To change your password, go to Account Settings, select the "Security" tab, and click on "Change Password". You will need to enter your current password and then your new password twice to confirm the change.'
        }
      ]
    },
    {
      id: 'assessments',
      title: 'Career Assessments',
      faqs: [
        {
          id: 'assessment-types',
          question: 'What types of assessments does VocateAI offer?',
          answer: 'VocateAI offers several types of assessments including skills assessments, personality assessments, interest inventories, and career values assessments. Each is designed to help you gain insights into different aspects of your career preferences and potential.'
        },
        {
          id: 'assessment-accuracy',
          question: 'How accurate are the assessment results?',
          answer: 'Our assessments are based on established psychological frameworks and career development theories. While they provide valuable insights, they should be considered as guidance rather than absolute determinations. We recommend using them as one of several tools in your career exploration process.'
        },
        {
          id: 'retake-assessment',
          question: 'Can I retake an assessment?',
          answer: 'Yes, you can retake any assessment after 30 days. This waiting period ensures that your responses are not unduly influenced by your previous assessment experience and allows time for genuine changes in your preferences or circumstances.'
        }
      ]
    },
    {
      id: 'resources',
      title: 'Learning Resources',
      faqs: [
        {
          id: 'resource-types',
          question: 'What types of learning resources are available?',
          answer: 'VocateAI offers a variety of learning resources including video courses, e-books, interactive tutorials, templates, worksheets, and webinars. These resources cover topics such as resume writing, interview preparation, networking, skill development, and career transitions.'
        },
        {
          id: 'download-resources',
          question: 'Can I download resources for offline use?',
          answer: 'Yes, many of our resources such as e-books, templates, and worksheets can be downloaded for offline use. Video courses and webinars are generally available for streaming only, but Pro and Enterprise subscribers can download select video content for offline viewing.'
        },
        {
          id: 'suggest-resource',
          question: 'Can I suggest a new resource topic?',
          answer: 'Absolutely! We welcome suggestions for new resource topics. You can submit your ideas through the "Suggest a Resource" form in the Resources section or by contacting our support team directly.'
        }
      ]
    }
  ];
  
  // Filter FAQs based on search term
  const filteredFAQs = searchTerm 
    ? faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0)
    : faqCategories;

  return (
    <MainLayout>
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-amber-50">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
              Support
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">
            Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400">Questions</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Find answers to common questions about VocateAI and our services.
            </p>
          </div>
          
          <div className="mb-10">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            
            {filteredFAQs.length > 0 ? (
              <div className="space-y-8">
                {filteredFAQs.map((category) => (
                  <div key={category.id}>
                    <h2 className="text-2xl font-bold text-amber-800 mb-4">{category.title}</h2>
                    <Card className="bg-white border-amber-200">
                      <CardContent className="pt-6">
                        <Accordion type="single" collapsible className="space-y-4">
                          {category.faqs.map((faq) => (
                            <AccordionItem 
                              key={faq.id} 
                              value={faq.id}
                              className="border-b border-amber-200 last:border-0"
                            >
                              <AccordionTrigger className="text-left font-medium text-slate-800 hover:text-amber-700 hover:no-underline">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-slate-600">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-amber-200">
                <HelpCircle className="h-12 w-12 text-amber-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">No results found</h3>
                <p className="text-slate-600 mb-6">
                  We couldn't find any FAQs matching your search criteria.
                </p>
                <Button 
                  variant="outline" 
                  className="border-amber-500 text-amber-700 hover:bg-amber-50"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-16 bg-white p-8 md:p-12 rounded-3xl border border-amber-200 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-slate-800">
                Still Have Questions?
              </h2>
              <p className="text-slate-700 max-w-3xl mx-auto">
                If you couldn't find the answer you were looking for, our support team is here to help.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Live Chat</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Chat with our support team in real-time during business hours.
                  </p>
                  <Button className="bg-white border-amber-500 text-amber-700 hover:bg-amber-50 w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Email Support</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Send us an email and we'll get back to you within 24 hours.
                  </p>
                  <Button className="bg-white border-amber-500 text-amber-700 hover:bg-amber-50 w-full">
                    Email Us
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Help Center</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Browse our comprehensive knowledge base for detailed guides.
                  </p>
                  <Button className="bg-white border-amber-500 text-amber-700 hover:bg-amber-50 w-full">
                    Visit Help Center
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              Join Our Community
            </h2>
            <p className="text-slate-700 mb-6 max-w-3xl mx-auto">
              Connect with other users, share experiences, and get advice from peers in our community forum.
            </p>
            <Button 
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
              size="lg"
            >
              Join Community <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}