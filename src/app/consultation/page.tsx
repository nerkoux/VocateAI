"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import VideoConsultation from '@/components/consultation/video-consultation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Bot, MessageSquare, Send, PlusCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ConsultationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [showConsultation, setShowConsultation] = useState(true); // Set to true by default
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "Hello! I'm Jeorge, Your AI Career Consultant. How can I help with your career journey today?", isUser: false}
  ]);
  const userName = session?.user?.name || "Career Explorer";

  // Handle animation steps with improved timing
  useEffect(() => {
    if (!showWelcomeAnimation) return;
    
    if (animationStep === 0) {
      const timer = setTimeout(() => setAnimationStep(1), 2200);
      return () => clearTimeout(timer);
    }
    
    // Other animation steps remain the same
  }, [showWelcomeAnimation, animationStep]);

  // If session is loading, show a loading state
  if (status === "loading") {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-yellow-500 border-b-transparent rounded-full animate-spin absolute top-0 opacity-70" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
          </div>
          <p className="mt-6 text-slate-600 animate-pulse">Loading your consultation...</p>
        </div>
      </MainLayout>
    );
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {text: inputValue, isUser: true}]);
    
    // Clear input
    setInputValue('');
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I understand your career concerns. Based on your question, I'd recommend exploring opportunities that align with your skills and interests. Would you like more specific guidance?",
        isUser: false
      }]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 h-[calc(100vh-8rem)] max-w-5xl">
        <div className="flex flex-col h-full">
          {/* Chat container */}
          <div className="flex-1 bg-white border border-amber-200 rounded-lg overflow-hidden flex flex-col shadow-md h-full">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-amber-50 border border-amber-200 text-slate-700'
                  }`}>
                    {!message.isUser && (
                      <div className="flex items-center mb-1">
                        <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center mr-2">
                          <Bot className="h-3.5 w-3.5 text-amber-700" />
                        </div>
                        <span className="text-xs font-medium text-amber-700">Jeorge</span>
                      </div>
                    )}
                    <p className={`text-sm ${message.isUser ? 'text-white' : 'text-slate-700'}`}>{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Input area */}
            <div className="border-t border-amber-200 p-4 bg-white">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full border-amber-200 text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
                <div className="flex-1 relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about career advice, job opportunities, skill development..."
                    className="w-full rounded-lg border border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 resize-none py-3 px-4 pr-12 text-slate-700 placeholder:text-slate-400 min-h-[50px] max-h-[200px] outline-none"
                    rows={1}
                  />
                  <Button 
                    size="icon" 
                    className="absolute right-2 bottom-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-center text-slate-400 mt-2">
                AI Career Consultant may produce inaccurate information. Verify important career decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}