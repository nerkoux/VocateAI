"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/main-layout';
import SubscribeButton from '@/components/pricing/subscribe-button';
import { PLAN_FEATURES, PLAN_PRICING } from '@/lib/stripe';

// Shadcn UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Icons
import { 
  ArrowRight, 
  Brain, 
  Briefcase, 
  CheckCircle, 
  ChevronRight, 
  Compass, 
  GraduationCap, 
  Rocket, 
  Sparkles, 
  Target 
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [assessmentStatus, setAssessmentStatus] = useState({
    mbtiCompleted: false,
    skillsCompleted: false,
    preferencesCompleted: false
  });
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  // Simulate loading assessment status
  useEffect(() => {
    const timer = setTimeout(() => {
      // This would normally come from an API or local storage
      const mockStatus = {
        mbtiCompleted: Math.random() > 0.5,
        skillsCompleted: Math.random() > 0.7,
        preferencesCompleted: Math.random() > 0.8
      };
      
      setAssessmentStatus(mockStatus);
      
      // Calculate progress percentage
      const completedCount = Object.values(mockStatus).filter(Boolean).length;
      setProgressPercentage(Math.round((completedCount / 3) * 100));
      
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <MainLayout>
      <div className="relative bg-white">
       
        
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 bg-amber-50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col space-y-6"
              >
                <Badge className="w-fit bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
                  VocateAI
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-800">
                  Discover Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400">Ideal Career Path</span>
                </h1>
                
                <p className="text-xl text-slate-700 max-w-xl">
                  Take our interactive assessments to find careers that match your personality, skills, and interests.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-lg shadow-amber-500/20 text-white"
                    onClick={() => router.push('/assessment')}
                  >
                    Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="lg" 
               variant="outline"
                    className="border-amber-500 bg-white hover:bg-amber-50 text-amber-700 hover:text-amber-800 transition-colors"
                    onClick={() => status === 'authenticated' ? router.push('/profile') : router.push('/auth/signin')}
                  >
                    {status === 'authenticated' ? 'View Profile' : 'Sign In'}
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative bg-white p-8 rounded-3xl border border-amber-200 shadow-xl">
                  <h3 className="text-2xl font-bold text-amber-800 mb-6">Start Your Career Discovery</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-amber-700">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Take the assessment</h4>
                        <p className="text-sm text-slate-600">Discover your personality type</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-amber-700">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Analyze your skills</h4>
                        <p className="text-sm text-slate-600">Identify your strengths</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-amber-700">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Get recommendations</h4>
                        <p className="text-sm text-slate-600">Get career matches</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 relative bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30 transition-colors">
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
                Your Journey to Career Clarity
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Our comprehensive assessment process helps you discover career paths that align with who you are.
              </p>
            </div>
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
                <TabsTrigger 
                  value="overview" 
                  className="text-slate-700 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-700"
                >
                  <Compass className="mr-2 h-4 w-4" /> Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="process" 
                  className="text-slate-700 data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-700"
                >
                  <Target className="mr-2 h-4 w-4" /> Process
                </TabsTrigger>
                <TabsTrigger 
                  value="benefits" 
                  className="text-slate-700 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-700"
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Benefits
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white p-6 rounded-xl border border-amber-200 shadow-lg"
                  >
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                      <Brain className="h-6 w-6 text-amber-700" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-800">Personality Insights</h3>
                    <p className="text-slate-600">
                      Discover how your personality traits influence your career preferences and work style.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white p-6 rounded-xl border border-amber-200 shadow-lg"
                  >
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-amber-700" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-800">Skills Analysis</h3>
                    <p className="text-slate-600">
                      Identify your strongest skills and learn how they align with different career paths.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white p-6 rounded-xl border border-amber-200 shadow-lg"
                  >
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                      <Rocket className="h-6 w-6 text-amber-700" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-800">Career Guidance</h3>
                    <p className="text-slate-600">
                      Get personalized career recommendations and learning resources based on your profile.
                    </p>
                  </motion.div>
                </div>
              </TabsContent>
              
              <TabsContent value="process" className="space-y-6">
                <Card className="bg-white border-amber-200">
                  <CardContent className="pt-6">
                    <ol className="space-y-6">
                      <li className="flex items-start">
                        <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-amber-500/30">
                          <span className="font-semibold text-amber-700">1</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-amber-700 mb-2">Take the Personality Assessment</h3>
                          <p className="text-slate-700">Discover your MBTI personality type and how it influences your career preferences.</p>
                          </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-amber-500/30">
                          <span className="font-semibold text-amber-700">2</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-amber-700 mb-2">Complete the Skills Assessment</h3>
                          <p className="text-slate-700">Rate your proficiency in various skills to identify your strengths and areas for growth.</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-amber-500/30">
                          <span className="font-semibold text-amber-700">3</span>
                        </div>
                        <div className="flex-1">
                        <h3 className="font-semibold text-lg text-amber-700 mb-2">Share Your Preferences</h3>
                          <p className="text-slate-700">Tell us about your work environment preferences and interests.</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-amber-500/30">
                          <span className="font-semibold text-amber-700">4</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-amber-700 mb-2">Get Personalized Recommendations</h3>
                          <p className="text-slate-700">Receive tailored career suggestions and resources based on your unique profile.</p>
                        </div>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="benefits" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white border-amber-200">
                    <CardHeader>
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle className="h-6 w-6 text-amber-700" />
                      </div>
                      <CardTitle className="text-amber-800">Career Clarity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700">
                        Gain a clear understanding of which career paths align with your personality, skills, and preferences, reducing uncertainty and decision fatigue.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-amber-200">
                    <CardHeader>
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-2">
                        <GraduationCap className="h-6 w-6 text-amber-700" />
                      </div>
                      <CardTitle className="text-amber-800">Learning Pathways</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700">
                        Discover the most efficient learning paths to develop the skills needed for your target careers, saving time and resources.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-amber-200">
                    <CardHeader>
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-2">
                        <Briefcase className="h-6 w-6 text-amber-700" />
                      </div>
                      <CardTitle className="text-amber-800">Job Satisfaction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700">
                        Increase your chances of finding fulfilling work by aligning your career choices with your natural strengths and interests.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-amber-200">
                    <CardHeader>
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-2">
                        <Rocket className="h-6 w-6 text-amber-700" />
                      </div>
                      <CardTitle className="text-amber-800">Growth Potential</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700">
                        Identify careers with strong growth trajectories that match your profile, positioning you for long-term success.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Assessment Progress Section */}
        <section className="py-16 md:py-24 relative bg-sky-50">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
                  Your Progress
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
                  Track Your Assessment Journey
                </h2>
                <p className="text-slate-700 mb-6">
                  Complete all three assessments to receive your personalized career recommendations. You can save your progress and return anytime.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${assessmentStatus.mbtiCompleted ? 'bg-green-500' : 'bg-amber-200'}`}>
                      {assessmentStatus.mbtiCompleted && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-slate-800">Personality Assessment</h3>
                        {assessmentStatus.mbtiCompleted ? (
                          <span className="text-green-500 text-sm">Completed</span>
                        ) : (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-amber-600 hover:text-amber-700"
                            onClick={() => router.push('/assessment/personality')}
                          >
                            Start <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">Discover your MBTI personality type</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${assessmentStatus.skillsCompleted ? 'bg-green-500' : 'bg-amber-200'}`}>
                      {assessmentStatus.skillsCompleted && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-slate-800">Skills Assessment</h3>
                        {assessmentStatus.skillsCompleted ? (
                          <span className="text-green-500 text-sm">Completed</span>
                        ) : (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-amber-600 hover:text-amber-700"
                            onClick={() => router.push('/assessment/skills')}
                          >
                            Start <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">Rate your proficiency in various skills</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${assessmentStatus.preferencesCompleted ? 'bg-green-500' : 'bg-amber-200'}`}>
                      {assessmentStatus.preferencesCompleted && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-slate-800">Preferences Assessment</h3>
                        {assessmentStatus.preferencesCompleted ? (
                          <span className="text-green-500 text-sm">Completed</span>
                        ) : (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-amber-600 hover:text-amber-700"
                            onClick={() => router.push('/assessment/preferences')}
                          >
                            Start <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">Share your work environment preferences</p>
                    </div>
                  </div>
                </div>
                
                {progressPercentage === 100 ? (
                  <Button 
                    className="mt-8 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-lg shadow-amber-500/20 text-white"
                    onClick={() => router.push('/results')}
                  >
                    View Your Results <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    className="mt-8 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-lg shadow-amber-500/20 text-white"
                    onClick={() => {
                      if (!assessmentStatus.mbtiCompleted) {
                        router.push('/assessment/personality');
                      } else if (!assessmentStatus.skillsCompleted) {
                        router.push('/assessment/skills');
                      } else {
                        router.push('/assessment/preferences');
                      }
                    }}
                  >
                    Continue Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-8 rounded-3xl border border-amber-200 shadow-xl"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-amber-800 mb-2">Assessment Progress</h3>
                  <p className="text-slate-600">Complete all three assessments to unlock your career matches</p>
                </div>
                
                {!loading && (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Your progress</span>
                      <span className="text-sm font-medium text-amber-700">{progressPercentage}% Complete</span>
                    </div>
                    <div className="h-2.5 bg-amber-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${assessmentStatus.mbtiCompleted ? 'bg-green-500' : 'bg-amber-200'}`} />
                        <span className="text-xs text-slate-600">Personality</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${assessmentStatus.skillsCompleted ? 'bg-green-500' : 'bg-amber-200'}`} />
                        <span className="text-xs text-slate-600">Skills</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${assessmentStatus.preferencesCompleted ? 'bg-green-500' : 'bg-amber-200'}`} />
                        <span className="text-xs text-slate-600">Preferences</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 md:py-24 relative bg-yellow-50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
                Common Questions
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Find answers to common questions about our career guidance platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white border-amber-200">
                <CardHeader>
                  <CardTitle className="text-lg text-amber-800">How long does the assessment take?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">
                    The complete assessment process takes approximately 15-20 minutes. You can save your progress and return later if needed.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-amber-200">
                <CardHeader>
                  <CardTitle className="text-lg text-amber-800">Is my data kept private?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">
                    Yes, we take privacy seriously. Your assessment data is stored securely and never shared with third parties without your consent.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-amber-200">
                <CardHeader>
                  <CardTitle className="text-lg text-amber-800">How accurate are the career recommendations?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">
                    Our recommendations are based on established career development frameworks and AI analysis of thousands of career paths. They provide strong guidance, but final decisions should always be yours.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-amber-200">
                <CardHeader>
                  <CardTitle className="text-lg text-amber-800">Do I need to create an account?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">
                    You can take the assessments without an account, but creating one allows you to save your results, track your progress, and receive personalized guidance over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 md:py-24 relative bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl relative">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-amber-200 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
                    Get Started Today
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
                    Begin Your Career Discovery Journey
                  </h2>
                  <p className="text-slate-700 mb-6">
                    Take the first step toward finding a career that truly aligns with who you are. Our assessments are designed to help you gain clarity and confidence in your career decisions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-lg shadow-amber-500/20 text-white"
                      onClick={() => router.push('/assessment')}
                    >
                      Start Free Assessment <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-amber-500 bg-white hover:bg-amber-50 text-amber-700 hover:text-amber-800 transition-colors"
                      onClick={() => router.push('/about')}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-3xl blur-3xl" />
                  <div className="relative bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-amber-200 shadow-xl">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Personalized Results</h3>
                        <p className="text-sm text-slate-600">Tailored to your unique profile</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Career Matches</h3>
                        <p className="text-sm text-slate-600">Discover careers aligned with your profile</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Learning Resources</h3>
                        <p className="text-sm text-slate-600">Get resources to develop key skills</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Expert Guidance</h3>
                        <p className="text-sm text-slate-600">AI-powered career recommendations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
                           {/* Pricing Section */}
                           <section className="py-16 md:py-24 relative bg-emerald-50">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
                Pricing Plans
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
                Choose Your Career Journey
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Select the plan that best fits your career development needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <Card className="bg-white border-amber-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-300"></div>
                <CardHeader>
                  <CardTitle className="text-xl text-amber-800">Basic</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-slate-800">Free</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">Perfect for those just starting their career journey</p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-slate-700">Personality Assessment</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-slate-700">Basic Career Matches</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-slate-700">Limited Skills Assessment</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-slate-700">Community Access</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  {/* Replace the Button with SubscribeButton */}
                  <SubscribeButton 
                    planType="BASIC"
                    className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800"
                  >
                    Get Started
                  </SubscribeButton>
                </CardFooter>
              </Card>
              
              {/* Standard Plan */}
              <Card className="bg-white border-amber-200 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                <CardHeader>
                  <div className="absolute -top-1 right-4">
                    <Badge className="bg-amber-500 hover:bg-amber-600">Popular</Badge>
                  </div>
                  <CardTitle className="text-xl text-amber-800">Standard</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-slate-800">₹399</span>
                    <span className="text-slate-600 ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">For professionals seeking career advancement</p>
                  
                  <ul className="space-y-3">
                    {/* Features list remains the same */}
                    {/* ... */}
                  </ul>
                </CardContent>
                <CardFooter>
                  {/* Replace the Button with SubscribeButton */}
                  <SubscribeButton 
                    planType="STANDARD"
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                  >
                    Subscribe Now
                  </SubscribeButton>
                </CardFooter>
              </Card>
              
              {/* Premium Plan */}
              <Card className="bg-white border-amber-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-700"></div>
                <CardHeader>
                  <CardTitle className="text-xl text-amber-800">Premium</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-slate-800">₹999</span>
                    <span className="text-slate-600 ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">Complete career development solution</p>
                  
                  <ul className="space-y-3">
                    {/* Features list remains the same */}
                    {/* ... */}
                  </ul>
                </CardContent>
                <CardFooter>
                  {/* Replace the Button with SubscribeButton */}
                  <SubscribeButton 
                    planType="PREMIUM"
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                  >
                    Go Premium
                  </SubscribeButton>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 md:py-16 relative bg-slate-100">
          {/* Remove the absolute gradient overlay */}
          <div className="container px-4 md:px-6 mx-auto max-w-7xl relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-amber-800 mb-4">VocateAI</h3>
                <p className="text-slate-600 mb-4 max-w-md">
                  Powered by AI to help you find your perfect career path. We combine personality insights, skills analysis, and career guidance to provide personalized recommendations.
                </p>
                <div className="flex space-x-4">
                  <Link href="#" className="text-amber-600 hover:text-amber-700">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-amber-600 hover:text-amber-700">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-amber-600 hover:text-amber-700">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-4">Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/community" className="text-slate-600 hover:text-amber-700">Vocate Community</Link>
                  </li>
                  <li>
                    <Link href="/guides" className="text-slate-600 hover:text-amber-700">Career Guides</Link>
                  </li>
                  <li>
                    <Link href="/resources" className="text-slate-600 hover:text-amber-700">Learning Resources</Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-slate-600 hover:text-amber-700">FAQ</Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/about" className="text-slate-600 hover:text-amber-700">About Us</Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-slate-600 hover:text-amber-700">Contact</Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-slate-600 hover:text-amber-700">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-slate-600 hover:text-amber-700">Terms of Service</Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-amber-200 pt-8">
              <p className="text-center text-slate-600 text-sm">
                © 2025 VocateAI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
}