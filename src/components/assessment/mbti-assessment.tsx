"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { calculateMBTI } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { sendAssessment } from '@/lib/api-utils';

// MBTI questions
const mbtiQuestions = [
  {
    id: 1,
    question: "At a party, you:",
    options: [
      { value: "E", text: "Interact with many, including strangers" },
      { value: "I", text: "Interact with a few, known to you" }
    ]
  },
  {
    id: 2,
    question: "You are more:",
    options: [
      { value: "S", text: "Realistic than speculative" },
      { value: "N", text: "Speculative than realistic" }
    ]
  },
  {
    id: 3,
    question: "Is it worse to:",
    options: [
      { value: "T", text: "Have your head in the clouds" },
      { value: "F", text: "Be in a rut" }
    ]
  },
  {
    id: 4,
    question: "You are more impressed by:",
    options: [
      { value: "T", text: "Principles" },
      { value: "F", text: "Emotions" }
    ]
  },
  {
    id: 5,
    question: "You are drawn more to:",
    options: [
      { value: "J", text: "The structured and scheduled" },
      { value: "P", text: "The unstructured and unplanned" }
    ]
  },
  {
    id: 6,
    question: "You prefer to work:",
    options: [
      { value: "E", text: "In teams, collaborating with others" },
      { value: "I", text: "Alone or in small, familiar groups" }
    ]
  },
  {
    id: 7,
    question: "You tend to choose:",
    options: [
      { value: "S", text: "What is practical and works now" },
      { value: "N", text: "What is innovative and might work in the future" }
    ]
  },
  {
    id: 8,
    question: "When making decisions, you typically rely on:",
    options: [
      { value: "T", text: "Logic and objective analysis" },
      { value: "F", text: "Personal values and how others will be affected" }
    ]
  },
  {
    id: 9,
    question: "You prefer environments that are:",
    options: [
      { value: "J", text: "Organized with clear expectations" },
      { value: "P", text: "Flexible with room for spontaneity" }
    ]
  },
  {
    id: 10,
    question: "When solving problems, you prefer to:",
    options: [
      { value: "S", text: "Follow established methods and procedures" },
      { value: "N", text: "Explore new approaches and possibilities" }
    ]
  },
  {
    id: 11,
    question: "You get more satisfaction from:",
    options: [
      { value: "E", text: "Discussing ideas with others" },
      { value: "I", text: "Reflecting on ideas by yourself" }
    ]
  },
  {
    id: 12,
    question: "In your free time, you prefer to:",
    options: [
      { value: "J", text: "Plan activities in advance" },
      { value: "P", text: "Be spontaneous and go with the flow" }
    ]
  }
];

export default function MBTIAssessment() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRetake, setIsRetake] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    // Check if this is a retake
    const mbtiResult = localStorage.getItem('mbtiResult');
    if (mbtiResult) {
      setIsRetake(true);
    }
  }, []);
  
  const progress = (currentQuestion / mbtiQuestions.length) * 100;
  
  const handleOptionSelect = async (value: string) => {
    const newResponses = [...responses, value];
    setResponses(newResponses);
    
    if (currentQuestion < mbtiQuestions.length - 1) {
      setShowAnimation(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setShowAnimation(false);
      }, 500);
    } else {
      // Assessment complete
      setIsSubmitting(true);
      const mbtiResult = calculateMBTI(newResponses);
      
      try {
        // Create a mapping of question IDs to responses
        const responsesMap: Record<string, string> = {};
        newResponses.forEach((response, index) => {
          responsesMap[`q${index + 1}`] = response;
        });
        
        // Save to localStorage first (as a backup)
        localStorage.setItem('mbtiResult', mbtiResult);
        localStorage.setItem('mbtiResponses', JSON.stringify(responsesMap));
        localStorage.setItem('mbtiCompleted', 'true');
        
        // Save to database if user is logged in
        if (status === 'authenticated') {
          // Save to MongoDB via Next.js API
          await fetch('/api/user/assessment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              mbtiResult,
              mbtiResponses: responsesMap,
              mbtiCompleted: true,
              completedAt: new Date().toISOString()
            }),
          });
        }
        
        // Set completion state
        setIsComplete(true);
        
        // Show completion screen by not redirecting immediately
        setIsSubmitting(false);
      } catch (err) {
        console.error('Error saving MBTI result:', err);
        // Even if there's an error, we've saved to localStorage, so continue
        setIsSubmitting(false);
      }
    }
  };
  
  // Show completion screen if all questions are answered
  if (currentQuestion === mbtiQuestions.length && !isSubmitting) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-xl border border-amber-200 shadow-md mb-8 text-center">
          <div className="mx-auto mb-4 bg-amber-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-amber-900">MBTI Assessment Complete!</h2>
          <p className="text-slate-700 mb-6">
            Your personality type is <span className="text-amber-600 font-semibold">{calculateMBTI(responses)}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
              onClick={() => router.push('/assessment?completed=mbti')}
            >
              Return to Assessment Hub
            </Button>
            <Button 
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
              onClick={() => router.push('/assessment?type=skills')}
            >
              Continue to Skills Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-amber-900">Personality Assessment</h2>
        <p className="text-slate-700 mb-4">
          Answer the following questions to discover your MBTI personality type.
        </p>
        <Progress value={progress} className="h-2 bg-amber-100" />
        <p className="text-right text-sm text-amber-700 mt-1">
          Question {currentQuestion + 1} of {mbtiQuestions.length}
        </p>
      </div>
      
      {isSubmitting ? (
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-xl border border-amber-200 shadow-md mb-8 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
          <p className="text-center text-amber-800">Processing your results...</p>
        </div>
      ) : (
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: showAnimation ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-xl border border-amber-200 shadow-md mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 text-amber-900">
            {mbtiQuestions[currentQuestion].question}
          </h3>
          
          <div className="space-y-4">
            {mbtiQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option.value)}
                className="w-full text-left p-4 rounded-lg bg-white hover:bg-amber-100 transition-colors border border-amber-200 text-slate-700 shadow-sm"
              >
                {option.text}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}