"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <MainLayout>
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-amber-50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
              Contact Us
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">
              Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400">Touch</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Card className="bg-white border-amber-200 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-amber-800 mb-6">Send Us a Message</h2>
                  
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                    >
                                         <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-700 mb-2">Message Sent!</h3>
                      <p className="text-green-600">
                        Thank you for reaching out. We'll get back to you as soon as possible.
                      </p>
                      <Button 
                        className="mt-4 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          required
                          className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Your message here..."
                          required
                          className="min-h-[150px] border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-8">
              <Card className="bg-white border-amber-200">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-amber-800 mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Mail className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Email</h3>
                        <p className="text-slate-600">support@vocateai.tech</p>
                        <p className="text-slate-600">info@vocateai.tech</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Phone className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Phone</h3>
                        <p className="text-slate-600">+1 (555) 123-4567</p>
                        <p className="text-slate-600">Mon-Fri, 9am-5pm EST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Office</h3>
                        <p className="text-slate-600">123 Innovation Drive</p>
                        <p className="text-slate-600">San Francisco, CA 94103</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-amber-200">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-amber-800 mb-4">Frequently Asked Questions</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">How long does it take to get a response?</h3>
                      <p className="text-slate-600">We typically respond to all inquiries within 24-48 business hours.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-slate-800">Do you offer career coaching services?</h3>
                      <p className="text-slate-600">Yes, we offer premium career coaching services. Please contact us for more information.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-slate-800">Is my assessment data private?</h3>
                      <p className="text-slate-600">Absolutely. We take data privacy seriously and never share your information without consent.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}