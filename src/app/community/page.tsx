"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight, MessageSquare, Heart, Share2 } from 'lucide-react';

export default function CommunityPage() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  
  useEffect(() => {
    // Set a timer to complete the animation after 3 seconds
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);
    
    // Set a timer to show "redirecting" message after 5 seconds
    const redirectMessageTimer = setTimeout(() => {
      setRedirecting(true);
    }, 5000);
    
    // Set a timer to redirect after 7 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = "https://community.vocateai.tech";
    }, 7000);
    
    // Clean up timers on component unmount
    return () => {
      clearTimeout(animationTimer);
      clearTimeout(redirectMessageTimer);
      clearTimeout(redirectTimer);
    };
  }, []);
  
  return (
    <MainLayout>
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-amber-50 min-h-screen flex flex-col items-center justify-center">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl text-center">
          {!redirecting ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
                Community
              </Badge>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 text-slate-800"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400">VocateAI Community</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Are you ready to connect with fellow professionals, share experiences, and grow together?
              </motion.p>
              
              <motion.div
                className="flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="relative w-24 h-24 mb-8">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-200"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 1.5, delay: 1.2, times: [0, 0.7, 1] }}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.8 }}
                  >
                    <Users className="h-12 w-12 text-amber-700" />
                  </motion.div>
                </div>
                
                <motion.div
                  className="flex space-x-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-amber-700" />
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-amber-700" />
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Share2 className="h-6 w-6 text-amber-700" />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animationComplete ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                  >
                    Join Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-24 h-24 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Redirecting you to the community page</h2>
              <p className="text-xl text-slate-700">Please wait a moment...</p>
            </motion.div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}