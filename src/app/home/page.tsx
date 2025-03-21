"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import SubscribeButton from '@/components/pricing/subscribe-button';
import { PLAN_FEATURES, PLAN_PRICING } from '@/lib/stripe';
import { 
  Briefcase, 
  GraduationCap, 
  Brain, 
  Sparkles, 
  Target, 
  ChevronRight, 
  Rocket,
  Lightbulb,
  Compass,
  BarChart,
  CheckCircle,
  ArrowRight,
  Crown
} from 'lucide-react';

function HomeContent() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showOptions, setShowOptions] = useState(false);
  const [activeTab, setActiveTab] = useState("discover");
  const [assessmentProgress, setAssessmentProgress] = useState({
    personality: 0,
    skills: 0,
    preferences: 0
  });
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
    
    // Check assessment progress from localStorage
    const mbtiCompleted = localStorage.getItem('mbtiCompleted') === 'true';
    const skillsCompleted = localStorage.getItem('skillsCompleted') === 'true';
    const preferencesCompleted = localStorage.getItem('preferencesCompleted') === 'true';
    
    setAssessmentProgress({
      personality: mbtiCompleted ? 100 : 0,
      skills: skillsCompleted ? 100 : 0,
      preferences: preferencesCompleted ? 100 : 0
    });
  }, [status, router]);
  
  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600">Loading...</p>
      </div>
    );
  }

  // Calculate overall progress
  const progressPercentage = Math.round(
    (assessmentProgress.personality + assessmentProgress.skills + assessmentProgress.preferences) / 3
  );

  return (
    <div className="relative py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100/50 to-yellow-50 z-0"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Card className="border-0 bg-white shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-4 bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors">
                    VocateAI
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-800">
                    Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500">{session?.user?.name || 'Explorer'}</span>
                  </h1>
                  <p className="text-slate-600 mb-6 text-lg">
                    Discover your ideal career path with personalized assessments and AI-powered guidance.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-lg shadow-amber-500/20 text-white"
                      onClick={() => setActiveTab("discover")}
                    >
                      Explore Options <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
                      onClick={() => router.push('/assessment')}
                    >
                      Start Assessment
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block relative h-full min-h-[300px] bg-gradient-to-br from-amber-100/50 to-yellow-100/50 rounded-l-3xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative w-64 h-64"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/50 to-yellow-200/50 animate-pulse"></div>
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-300/50 to-yellow-300/50 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-amber-400/50 to-yellow-400/50 animate-pulse" style={{ animationDelay: '600ms' }}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Compass className="h-24 w-24 text-amber-500" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="discover" value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="discover" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800">
              <Compass className="mr-2 h-4 w-4" /> Discover
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800">
              <BarChart className="mr-2 h-4 w-4" /> Progress
            </TabsTrigger>
            <TabsTrigger value="next-steps" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800">
              <Rocket className="mr-2 h-4 w-4" /> Next Steps
            </TabsTrigger>
            <TabsTrigger value="plans" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800">
              <Crown className="mr-2 h-4 w-4" /> Plans
            </TabsTrigger>
          </TabsList>
          
          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-800">
                <Compass className="mr-2 h-6 w-6 text-amber-500" /> Career Exploration Options
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white border-amber-200 hover:border-amber-400 transition-all hover:shadow-lg hover:shadow-amber-200/30 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-amber-200 transition-colors">
                      <Brain className="h-6 w-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-amber-600 transition-colors text-slate-800">Personality Assessment</CardTitle>
                    <CardDescription>Discover your MBTI personality type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">Understand how your personality traits align with different career paths.</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-400/80 to-amber-500/80 group-hover:from-amber-400 group-hover:to-amber-500 text-white"
                      onClick={() => router.push('/assessment?type=mbti')}
                    >
                      Start Assessment
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-white border-amber-200 hover:border-amber-400 transition-all hover:shadow-lg hover:shadow-amber-200/30 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-amber-200 transition-colors">
                      <Target className="h-6 w-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-amber-600 transition-colors text-slate-800">Skills Assessment</CardTitle>
                    <CardDescription>Identify your strengths and growth areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">Evaluate your technical, soft, and specialized skills to find matching careers.</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-400/80 to-amber-500/80 group-hover:from-amber-400 group-hover:to-amber-500 text-white"
                      onClick={() => router.push('/assessment?type=skills')}
                    >
                      Discover Skills
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-white border-amber-200 hover:border-amber-400 transition-all hover:shadow-lg hover:shadow-amber-200/30 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-amber-200 transition-colors">
                      <Sparkles className="h-6 w-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-amber-600 transition-colors text-slate-800">Career Consultation</CardTitle>
                    <CardDescription>Get personalized AI guidance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">Chat with our AI career advisor for tailored advice and recommendations.</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-400/80 to-amber-500/80 group-hover:from-amber-400 group-hover:to-amber-500 text-white"
                      onClick={() => router.push('/consultation')}
                    >
                      Start Consultation
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
          
          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-800">
                <BarChart className="mr-2 h-6 w-6 text-amber-500" /> Your Assessment Progress
              </h2>
              
              <Card className="bg-white border-amber-200">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
                      <h3 className="text-lg font-semibold mb-3 text-amber-700 flex items-center">
                        <Brain className="mr-2 h-5 w-5" /> Personality
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-3 text-sm font-medium text-amber-800">
                          {assessmentProgress.personality}%
                        </div>
                        <div className="flex-1">
                          <Progress value={assessmentProgress.personality} className="h-2.5 bg-amber-100">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all" 
                              style={{ width: `${assessmentProgress.personality}%` }}
                            />
                          </Progress>
                          <p className="text-xs text-slate-500 mt-1">
                            {assessmentProgress.personality === 100 ? "Completed" : "Not started"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
                      <h3 className="text-lg font-semibold mb-3 text-amber-700 flex items-center">
                        <Target className="mr-2 h-5 w-5" /> Skills
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-3 text-sm font-medium text-amber-800">
                          {assessmentProgress.skills}%
                        </div>
                        <div className="flex-1">
                          <Progress value={assessmentProgress.skills} className="h-2.5 bg-amber-100">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all" 
                              style={{ width: `${assessmentProgress.skills}%` }}
                            />
                          </Progress>
                          <p className="text-xs text-slate-500 mt-1">
                            {assessmentProgress.skills === 100 ? "Completed" : "Not started"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
                      <h3 className="text-lg font-semibold mb-3 text-amber-700 flex items-center">
                        <Briefcase className="mr-2 h-5 w-5" /> Preferences
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-3 text-sm font-medium text-amber-800">
                          {assessmentProgress.preferences}%
                        </div>
                        <div className="flex-1">
                          <Progress value={assessmentProgress.preferences} className="h-2.5 bg-amber-100">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all" 
                              style={{ width: `${assessmentProgress.preferences}%` }}
                            />
                          </Progress>
                          <p className="text-xs text-slate-500 mt-1">
                            {assessmentProgress.preferences === 100 ? "Completed" : "Not started"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h3 className="text-lg font-semibold mb-3 text-amber-700">Overall Progress</h3>
                    <div className="w-full max-w-md mb-2">
                      <Progress value={progressPercentage} className="h-3 bg-amber-100">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all" 
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </Progress>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{progressPercentage}% Complete</p>
                    
                    {progressPercentage < 100 ? (
                      <Button 
                        className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-lg shadow-amber-500/20 text-white"
                        onClick={() => {
                          if (!assessmentProgress.personality) {
                            router.push('/assessment?type=mbti');
                          } else if (!assessmentProgress.skills) {
                            router.push('/assessment?type=skills');
                          } else {
                            router.push('/assessment?type=preferences');
                          }
                        }}
                      >
                        Continue Assessment <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-lg shadow-amber-500/20 text-white"
                        onClick={() => router.push('/results')}
                      >
                        View Your Results <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Next Steps Tab */}
          <TabsContent value="next-steps" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-800">
                <Rocket className="mr-2 h-6 w-6 text-amber-500" /> Recommended Next Steps
              </h2>
              
              <Card className="bg-white border-amber-200">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-semibold text-amber-700">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-amber-700 mb-1">Complete Your Assessments</h3>
                        <p className="text-slate-600 mb-3">Finish all three assessments to get the most accurate career recommendations.</p>
                        {progressPercentage < 100 && (
                          <Button 
                            variant="outline" 
                            className="border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
                            onClick={() => setActiveTab("progress")}
                          >
                            View Progress
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-semibold text-amber-700">2</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-amber-700 mb-1">Explore Career Matches</h3>
                        <p className="text-slate-600 mb-3">Review your personalized career recommendations based on your assessment results.</p>
                        <Button 
                          variant="outline" 
                          className="border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
                          onClick={() => router.push('/careers')}
                        >
                          Explore Careers
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-semibold text-amber-700">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-amber-700 mb-1">Upgrade Your Plan</h3>
                        <p className="text-slate-600 mb-3">Get access to premium features like detailed career insights, learning paths, and personalized guidance.</p>
                        <Button 
                          variant="outline" 
                          className="border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
                          onClick={() => setActiveTab("plans")}
                        >
                          View Plans
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-semibold text-amber-700">4</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-amber-700 mb-1">Get AI Career Guidance</h3>
                        <p className="text-slate-600 mb-3">Chat with our AI career advisor for personalized advice and answers to your career questions.</p>
                        <Button 
                          variant="outline" 
                          className="border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
                          onClick={() => router.push('/consultation')}
                        >
                          Start Consultation
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-800">
                <Crown className="mr-2 h-6 w-6 text-amber-500" /> Subscription Plans
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      {PLAN_FEATURES.BASIC.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
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
                      {PLAN_FEATURES.STANDARD.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
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
                      {PLAN_FEATURES.PREMIUM.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <SubscribeButton 
                      planType="PREMIUM"
                      className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                    >
                      Go Premium
                    </SubscribeButton>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <MainLayout>
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      }>
        <HomeContent />
      </Suspense>
    </MainLayout>
  );
}