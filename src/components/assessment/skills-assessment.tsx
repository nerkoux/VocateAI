"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const skillCategories = [
  {
    name: "Technical Skills",
    skills: [
      "Programming",
      "Data Analysis",
      "Web Development",
      "Graphic Design",
      "Digital Marketing"
    ]
  },
  {
    name: "Soft Skills",
    skills: [
      "Communication",
      "Leadership",
      "Teamwork",
      "Problem Solving",
      "Time Management"
    ]
  },
  {
    name: "Industry Knowledge",
    skills: [
      "Business",
      "Healthcare",
      "Education",
      "Technology",
      "Creative Arts"
    ]
  }
];

export default function SkillsAssessment() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [mbtiResult, setMbtiResult] = useState<string | null>(null);
  const [mbtiResponses, setMbtiResponses] = useState<Record<string, string> | null>(null);
  
  // Initialize skill ratings and get MBTI data
  useEffect(() => {
    const fetchData = async () => {
      // First try to get MBTI result from localStorage
      const localMbtiResult = localStorage.getItem('mbtiResult');
      const localMbtiResponses = localStorage.getItem('mbtiResponses');
      
      if (localMbtiResult) {
        setMbtiResult(localMbtiResult);
      }
      
      if (localMbtiResponses) {
        try {
          setMbtiResponses(JSON.parse(localMbtiResponses));
        } catch (e) {
          console.error('Error parsing MBTI responses:', e);
        }
      }
      
      // Initialize skill ratings with default values
      const initialRatings: Record<string, number> = {};
      skillCategories.forEach(category => {
        category.skills.forEach(skill => {
          initialRatings[skill] = 3; // Default to middle value
        });
      });
      setSkillRatings(initialRatings);
      
      // If authenticated, try to get data from server
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/user');
          const data = await response.json();
          
          if (data.user) {
            // Set MBTI result from database if available
            if (data.user.mbtiResult) {
              setMbtiResult(data.user.mbtiResult);
            } else if (!localMbtiResult) {
              // Redirect if no MBTI result anywhere
              alert("Please complete the MBTI assessment first.");
              router.push('/assessment');
              return;
            }
            
            // Set MBTI responses from database if available
            if (data.user.mbtiResponses) {
              setMbtiResponses(data.user.mbtiResponses);
            }
            
            // Set skill ratings from database if available
            if (data.user.skillRatings) {
              setSkillRatings(data.user.skillRatings);
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Continue with localStorage data if API fails
        }
      } else if (status === 'unauthenticated') {
        // Check if MBTI is completed
        if (!localMbtiResult) {
          alert("Please complete the MBTI assessment first.");
          router.push('/assessment');
          return;
        }
      }
    };
    
    fetchData();
  }, [router, status]);
  
  const handleRatingChange = (skill: string, rating: number) => {
    setSkillRatings({
      ...skillRatings,
      [skill]: rating
    });
  };
  
  const handleNext = () => {
    const currentSkills = skillCategories[currentCategory].skills;
    const allRated = currentSkills.every(skill => skillRatings[skill] !== undefined);
    
    if (!allRated) {
      alert("Please rate all skills in this category before continuing.");
      return;
    }
    
    if (currentCategory < skillCategories.length - 1) {
      setCurrentCategory(currentCategory + 1);
    } else {
      // Assessment complete
      setCompleted(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Save to localStorage first
      localStorage.setItem('skillRatings', JSON.stringify(skillRatings));
      localStorage.setItem('skillsCompleted', 'true');
      
      // If user is authenticated, save to database
      if (status === 'authenticated') {
        // Get MBTI data to ensure it's included in the submission
        const localMbtiResult = mbtiResult || localStorage.getItem('mbtiResult');
        const localMbtiResponses = mbtiResponses || 
          (localStorage.getItem('mbtiResponses') ? 
            JSON.parse(localStorage.getItem('mbtiResponses') || '{}') : null);
        
        // Save to MongoDB via Next.js API
        const response = await fetch('/api/user/assessment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            skillRatings: skillRatings,
            mbtiResult: localMbtiResult,
            mbtiResponses: localMbtiResponses,
            skillsCompleted: true,
            completedAt: new Date().toISOString()
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to save assessment data');
        }
        
        // Pre-generate career guidance
        try {
          await fetch('/api/career-guidance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mbtiType: localMbtiResult,
              skills: skillRatings
            }),
          });
        } catch (error) {
          console.error('Error pre-generating career guidance:', error);
          // Continue even if guidance generation fails
        }
      }
      
      // Redirect to results page
      router.push('/assessment?completed=skills');
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('There was an error submitting your assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const progress = ((currentCategory / skillCategories.length) * 100);
  
  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white p-8 rounded-xl border border-amber-200 shadow-lg mb-8 text-center">
            <div className="mx-auto mb-6 bg-gradient-to-r from-amber-400 to-yellow-400 p-4 rounded-full w-20 h-20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-amber-900">Skills Assessment Complete!</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-slate-700 mb-6">
              Thank you for rating your skills. Your profile has been updated with your skill proficiency levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-md"
                onClick={handleSubmit} 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <span className="mr-2">Saving...</span>
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                  </div>
                ) : (
                  "Save & View Results"
                )}
              </Button>
              <Button 
                variant="outline" 
                className="border-amber-300 text-amber-700 hover:bg-amber-50 shadow-sm"
                onClick={() => router.push('/assessment')}
                disabled={isSubmitting}
              >
                Return to Assessment Hub
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const currentCategoryData = skillCategories[currentCategory];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2 text-amber-900">Skills Assessment</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto mb-4 rounded-full"></div>
          <p className="text-slate-700 mb-8 max-w-lg mx-auto">
            Rate your proficiency in various skills to help identify your strengths and areas for development.
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <Progress value={progress} className="h-3 bg-amber-100" />
            <div className="flex justify-between mt-2 text-sm text-amber-700">
              <span>Category {currentCategory + 1} of {skillCategories.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>
        </div>
        
        <motion.div
          key={currentCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-xl border border-amber-200 shadow-lg mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 text-amber-900 text-center">
            {currentCategoryData.name}
          </h3>
          
          <div className="space-y-6">
            {currentCategoryData.skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <label className="font-medium text-amber-800">{skill}</label>
                  <span className="text-sm text-amber-600 font-medium">
                    {skillRatings[skill] ? 
                      ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'][Math.min(skillRatings[skill] - 1, 4)] : 
                      'Not Rated'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(skill, rating)}
                      className={`flex-1 h-10 rounded-md transition-all duration-200 ${
                        skillRatings[skill] === rating 
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-400 shadow-md transform scale-105' 
                          : 'bg-amber-50 hover:bg-amber-100 border border-amber-200'
                      }`}
                      aria-label={`Rate ${skill} as ${['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'][rating - 1]}`}
                    >
                      <span className={`text-xs font-medium ${skillRatings[skill] === rating ? 'text-white' : 'text-amber-700'}`}>
                        {['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'][rating - 1]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-4 border-t border-amber-100">
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                onClick={handlePrevious}
                disabled={currentCategory === 0}
              >
                Previous
              </Button>
              
              <Button
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                onClick={handleNext}
              >
                {currentCategory < skillCategories.length - 1 ? 'Next' : 'Complete'}
              </Button>
            </div>
          </div>
        </motion.div>
        
        <div className="text-center text-slate-500 text-sm">
          Your skill ratings help us provide more personalized career recommendations.
        </div>
      </div>
      
      {isSubmitting && (
        <div className="fixed inset-0 bg-amber-900/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl border border-amber-200">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-500 mx-auto mb-4"></div>
            <p className="text-center text-amber-800">Processing your results...</p>
            <p className="text-center text-slate-600 text-sm mt-2">This will only take a moment</p>
          </div>
        </div>
      )}
    </div>
  );
}