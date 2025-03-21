"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/main-layout';
import { useSession, signIn, signOut } from "next-auth/react";
import FormattedDate from '@/components/ui/formatted-date';
import { useRouter } from 'next/navigation';

// Shadcn UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  BookOpen, 
  Brain, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Compass, 
  LogOut, 
  RefreshCw, 
  Rocket, 
  Settings, 
  Sparkles, 
  MessageSquare,
  ChevronRight,
  BarChart,
  Shield,
  Star
} from 'lucide-react';

// Interface for user profile
interface UserProfile {
  name: string;
  email: string;
  image: string;
  mbtiType?: string;
  skillRatings?: Record<string, number>;
  completedAt?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate loading profile data
    const timer = setTimeout(() => {
      if (session?.user) {
        // Mock profile data based on session
        setProfile({
          name: session.user.name || 'User',
          email: session.user.email || '',
          image: session.user.image || '',
          mbtiType: localStorage.getItem('mbtiResult') || undefined,
          skillRatings: JSON.parse(localStorage.getItem('skillRatings') || '{}'),
          completedAt: localStorage.getItem('mbtiResult') ? new Date().toISOString() : undefined
        });
      } else {
        // Default guest profile
        setProfile({
          name: 'Guest User',
          email: '',
          image: '',
          mbtiType: localStorage.getItem('mbtiResult') || undefined,
          skillRatings: JSON.parse(localStorage.getItem('skillRatings') || '{}'),
          completedAt: localStorage.getItem('mbtiResult') ? new Date().toISOString() : undefined
        });
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [session]);

  // Handle retake function
  const handleRetake = (type: 'mbti' | 'skills') => {
    if (type === 'mbti') {
      localStorage.removeItem('mbtiResult');
      localStorage.removeItem('mbtiResponses');
    } else {
      localStorage.removeItem('skillRatings');
    }
    
    router.push(`/assessment?type=${type}`);
  };

  // Handle sign out function
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  // Get assessment status function
  const getAssessmentStatus = () => {
    if (profile?.mbtiType && profile?.skillRatings && Object.keys(profile.skillRatings).length > 0) {
      return 'complete';
    } else if (profile?.mbtiType) {
      return 'mbti-only';
    } else {
      return 'none';
    }
  };

  // Calculate assessment status
  const assessmentStatus = getAssessmentStatus();
  
  // Calculate completion percentage
  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 2; // MBTI and Skills
    
    if (profile?.mbtiType) completed++;
    if (profile?.skillRatings && Object.keys(profile.skillRatings).length > 0) completed++;
    
    return (completed / total) * 100;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-amber-300 animate-spin" style={{ animationDuration: '1.5s' }}></div>
          </div>
          <p className="mt-6 text-amber-800 font-medium">Loading your profile...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-amber-50/50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Card className="border-none overflow-hidden bg-gradient-to-r from-amber-100 to-yellow-100 shadow-lg">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center md:items-stretch">
                  {/* Profile Sidebar */}
                  <div className="w-full md:w-1/3 bg-gradient-to-b from-amber-200/50 to-amber-100/50 p-6 flex flex-col items-center md:items-start justify-center space-y-4">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                        {profile?.image ? (
                          <AvatarImage src={profile.image} alt={profile.name} />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-amber-400 to-yellow-500 text-2xl text-white">
                            {profile?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                        <Settings className="h-4 w-4 text-amber-500" />
                      </div>
                    </div>
                    
                    <div className="text-center md:text-left mt-2">
                      <h2 className="text-xl font-bold text-amber-900">{profile?.name}</h2>
                      <div className="flex items-center gap-1 text-amber-700 text-sm mt-1">
                        <Mail className="h-3.5 w-3.5" />
                        <span>{profile?.email || 'No email'}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                      {status === 'authenticated' ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleSignOut}
                          className="bg-white/80 border-amber-200 text-amber-700 hover:bg-amber-50"
                        >
                          <LogOut className="h-3.5 w-3.5 mr-1.5" />
                          Sign Out
                        </Button>
                      ) : (
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={() => signIn()}
                          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                        >
                          <User className="h-3.5 w-3.5 mr-1.5" />
                          Sign In
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Profile Stats */}
                  <div className="w-full md:w-2/3 p-6 md:p-8">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">
                          Your Career Profile
                        </h1>
                        <p className="text-amber-700 mb-6">
                          Track your progress and discover personalized career insights
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <Card className="bg-white/80 border-amber-100">
                            <CardContent className="p-4 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                <Brain className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-amber-700">Personality Type</p>
                                <p className="font-bold text-amber-900">
                                  {profile?.mbtiType || 'Not Assessed'}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-white/80 border-amber-100">
                            <CardContent className="p-4 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                <Briefcase className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-amber-700">Skills Rated</p>
                                <p className="font-bold text-amber-900">
                                  {profile?.skillRatings ? Object.keys(profile.skillRatings).length : 0}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-white/80 border-amber-100">
                            <CardContent className="p-4 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                <Award className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-amber-700">Profile Status</p>
                                <div className="flex items-center gap-1.5">
                                  <Badge 
                                    className={`
                                      ${assessmentStatus === 'complete' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 
                                        assessmentStatus === 'mbti-only' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 
                                        'bg-slate-100 text-slate-700 hover:bg-slate-200'}
                                    `}
                                  >
                                    {assessmentStatus === 'complete' ? 'Complete' : 
                                     assessmentStatus === 'mbti-only' ? 'In Progress' : 'Not Started'}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <div>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-amber-700 font-medium">Profile Completion</span>
                            <span className="text-amber-900 font-bold">{Math.round(getCompletionPercentage())}%</span>
                          </div>
                          <Progress 
                            value={getCompletionPercentage()} 
                            className="h-2 bg-amber-100 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-yellow-500"
                          />
                        </div>
                        
                        <div className="flex flex-wrap gap-2 justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => router.push('/assessment')}
                            className="bg-white/80 border-amber-200 text-amber-700 hover:bg-amber-50"
                          >
                            <Award className="h-3.5 w-3.5 mr-1.5" />
                            Assessments
                          </Button>
                          
                          {assessmentStatus === 'complete' && (
                            <Button 
                              variant="default" 
                              size="sm" 
                              onClick={() => router.push('/results')}
                              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                            >
                              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                              View Results
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList className="bg-amber-100/70 border border-amber-200 p-1">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-slate-800 data-[state=active]:text-white"
                  >
                    <Compass className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="personality" 
                    className="data-[state=active]:bg-slate-800 data-[state=active]:text-white"
                    disabled={!profile?.mbtiType}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Personality
                  </TabsTrigger>
                  <TabsTrigger 
                    value="skills" 
                    className="data-[state=active]:bg-slate-800 data-[state=active]:text-white"
                    disabled={!profile?.skillRatings || Object.keys(profile?.skillRatings || {}).length === 0}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Skills
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push('/consultation')}
                    className="bg-white/80 border-amber-200 text-amber-700 hover:bg-amber-50"
                  >
                    <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                    AI Consultation
                  </Button>
                </div>
              </div>
              
              {/* Overview Tab Content */}
              <TabsContent value="overview" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Career Journey Card */}
                  <Card className="lg:col-span-2 border-amber-200 bg-white/90 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-amber-800 flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-amber-500" />
                        Your Career Journey
                      </CardTitle>
                      <CardDescription>Track your progress and discover personalized career insights</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Welcome message */}
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
                        <h3 className="text-lg font-medium text-amber-800 mb-2 flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-amber-500" />
                          Welcome to Your Career Dashboard
                        </h3>
                        <p className="text-slate-600">
                          Complete your assessments to unlock personalized career recommendations and insights tailored to your unique personality and skills.
                        </p>
                      </div>
                      
                      {/* Next steps */}
                      <div>
                        <h3 className="text-lg font-medium text-amber-800 mb-3">Next Steps</h3>
                        <div className="space-y-3">
                          <div className={`flex items-start gap-3 p-3 rounded-lg border ${profile?.mbtiType ? 'border-green-200 bg-green-50/80' : 'border-amber-200 bg-white/90'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${profile?.mbtiType ? 'bg-green-500 text-white' : 'bg-amber-100 text-amber-500'}`}>
                              {profile?.mbtiType ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <span className="text-xs font-bold">1</span>
                              )}
                            </div>
                            <div>
                              <h4 className={`font-medium ${profile?.mbtiType ? 'text-green-700' : 'text-amber-800'}`}>
                                Complete Personality Assessment
                              </h4>
                              <p className="text-sm text-slate-600">
                                {profile?.mbtiType ? (
                                  <>Completed! Your personality type is <span className="font-medium text-amber-600">{profile.mbtiType}</span></>
                                ) : (
                                  "Discover your MBTI personality type to understand your work style and preferences"
                                )}
                              </p>
                              {!profile?.mbtiType && (
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  onClick={() => router.push('/assessment?type=mbti')}
                                  className="px-0 text-amber-500 hover:text-amber-600"
                                >
                                  Start Assessment →
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className={`flex items-start gap-3 p-3 rounded-lg border ${profile?.skillRatings && Object.keys(profile.skillRatings).length > 0 ? 'border-green-200 bg-green-50/80' : 'border-amber-200 bg-white/90'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${profile?.skillRatings && Object.keys(profile.skillRatings).length > 0 ? 'bg-green-500 text-white' : 'bg-amber-100 text-amber-500'}`}>
                              {profile?.skillRatings && Object.keys(profile.skillRatings).length > 0 ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <span className="text-xs font-bold">2</span>
                              )}
                            </div>
                            <div>
                              <h4 className={`font-medium ${profile?.skillRatings && Object.keys(profile.skillRatings).length > 0 ? 'text-green-700' : 'text-amber-800'}`}>
                                Complete Skills Assessment
                              </h4>
                              <p className="text-sm text-slate-600">
                                {profile?.skillRatings && Object.keys(profile.skillRatings).length > 0 ? (
                                  <>Completed! You've rated <span className="font-medium text-amber-600">{Object.keys(profile.skillRatings).length}</span> professional skills</>
                                ) : (
                                  "Rate your professional skills to identify your strengths and areas for growth"
                                )}
                              </p>
                              {(!profile?.skillRatings || Object.keys(profile.skillRatings).length === 0) && (
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  onClick={() => router.push('/assessment?type=skills')}
                                  className="px-0 text-amber-500 hover:text-amber-600"
                                >
                                  Start Assessment →
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className={`flex items-start gap-3 p-3 rounded-lg border ${assessmentStatus === 'complete' ? 'border-green-200 bg-green-50/80' : 'border-amber-200 bg-white/90'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${assessmentStatus === 'complete' ? 'bg-green-500 text-white' : 'bg-amber-100 text-amber-500'}`}>
                              {assessmentStatus === 'complete' ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <span className="text-xs font-bold">3</span>
                              )}
                            </div>
                            <div>
                              <h4 className={`font-medium ${assessmentStatus === 'complete' ? 'text-green-700' : 'text-amber-800'}`}>
                                View Career Recommendations
                              </h4>
                              <p className="text-sm text-slate-600">
                                {assessmentStatus === 'complete' ? (
                                  <>Ready! Explore personalized career paths based on your profile</>
                                ) : (
                                  "Complete both assessments to unlock personalized career recommendations"
                                )}
                              </p>
                              {assessmentStatus === 'complete' && (
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  onClick={() => router.push('/results')}
                                  className="px-0 text-amber-500 hover:text-amber-600"
                                >
                                  View Recommendations →
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Quick Actions Card */}
                  <Card className="border-amber-200 bg-white/90 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-amber-800 flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-amber-500" />
                        Quick Actions
                      </CardTitle>
                      <CardDescription>Helpful resources and tools</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-amber-200 text-amber-700 hover:bg-amber-50 bg-white/90"
                        onClick={() => router.push('/consultation')}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Start AI Consultation
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-amber-200 text-amber-700 hover:bg-amber-50 bg-white/90"
                        onClick={() => router.push('/resources')}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Browse Career Resources
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-amber-200 text-amber-700 hover:bg-amber-50 bg-white/90"
                        onClick={() => router.push('/guides')}
                      >
                        <Compass className="h-4 w-4 mr-2" />
                        Career Guides
                      </Button>
                      
                      <Separator className="my-2 bg-amber-100" />
                      
                      <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200">
                        <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                          <Star className="h-4 w-4 text-amber-500" />
                          Premium Features
                        </h4>
                        <p className="text-sm text-slate-600 mb-3">
                          Unlock advanced career insights and personalized coaching
                        </p>
                        <Button 
                          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                          size="sm"
                          onClick={() => router.push('/pricing')}
                        >
                          Explore Premium
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Personality Tab Content */}
              <TabsContent value="personality" className="mt-0">
                <Card className="border-amber-200 bg-white/90 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-amber-800 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-amber-500" />
                      Your Personality Profile
                    </CardTitle>
                    <CardDescription>Understanding your MBTI personality type and work preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {profile?.mbtiType ? (
                      <>
                        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-6 rounded-lg border border-amber-200">
                          <h3 className="text-3xl font-bold text-amber-800 mb-2">{profile.mbtiType}</h3>
                          <p className="text-slate-600">
                            {getMBTIDescription(profile.mbtiType)}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-amber-800 mb-3">Your Work Style</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getMBTIWorkTraits(profile.mbtiType).map((trait, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-amber-200 bg-white/90">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="font-medium text-amber-800">{trait.title}</h4>
                                  <p className="text-sm text-slate-600">{trait.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRetake('mbti')}
                            className="border-amber-200 text-amber-700 hover:bg-amber-50"
                          >
                            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                            Retake Assessment
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 bg-amber-50/50 rounded-lg">
                        <p className="text-slate-500 mb-4">Complete your personality assessment to see results</p>
                        <Button 
                          onClick={() => router.push('/assessment?type=mbti')}
                          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                        >
                          <Rocket className="h-4 w-4 mr-2" />
                          Start Assessment
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
                            {/* Skills Tab Content */}
                            <TabsContent value="skills" className="mt-0">
                <Card className="border-amber-200 bg-white/90 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-amber-800 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-amber-500" />
                      Your Skills Profile
                    </CardTitle>
                    <CardDescription>Review your self-assessed skills and identify areas for growth</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {profile?.skillRatings && Object.keys(profile.skillRatings).length > 0 ? (
                      <>
                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
                          <h3 className="text-lg font-medium text-amber-800 mb-2 flex items-center gap-2">
                            <BarChart className="h-5 w-5 text-amber-500" />
                            Skills Overview
                          </h3>
                          <p className="text-slate-600 mb-2">
                            You've rated {Object.keys(profile.skillRatings).length} professional skills. Here's a breakdown of your strengths and areas for improvement.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-amber-800 mb-3">Your Top Skills</h3>
                          <div className="space-y-4">
                            {Object.entries(profile.skillRatings)
                              .sort(([, a], [, b]) => b - a)
                              .slice(0, 5)
                              .map(([skill, rating], index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium text-amber-800">{skill}</span>
                                    <span className="text-sm text-amber-600 font-medium">{rating}/10</span>
                                  </div>
                                  <Progress 
                                    value={rating * 10} 
                                    className="h-2 bg-amber-100 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-yellow-500"
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-amber-800 mb-3">Areas for Growth</h3>
                          <div className="space-y-4">
                            {Object.entries(profile.skillRatings)
                              .sort(([, a], [, b]) => a - b)
                              .slice(0, 3)
                              .map(([skill, rating], index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium text-amber-800">{skill}</span>
                                    <span className="text-sm text-amber-600 font-medium">{rating}/10</span>
                                  </div>
                                  <Progress 
                                    value={rating * 10} 
                                    className="h-2 bg-amber-100 [&>div]:bg-gradient-to-r [&>div]:from-amber-300 [&>div]:to-amber-400"
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="border-amber-200 bg-white/80">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-amber-800 text-lg">Skill Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-amber-700">Beginner (1-3)</span>
                                  <span className="font-medium text-amber-900">
                                    {Object.values(profile.skillRatings).filter(rating => rating >= 1 && rating <= 3).length}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-amber-700">Intermediate (4-6)</span>
                                  <span className="font-medium text-amber-900">
                                    {Object.values(profile.skillRatings).filter(rating => rating >= 4 && rating <= 6).length}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-amber-700">Advanced (7-8)</span>
                                  <span className="font-medium text-amber-900">
                                    {Object.values(profile.skillRatings).filter(rating => rating >= 7 && rating <= 8).length}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-amber-700">Expert (9-10)</span>
                                  <span className="font-medium text-amber-900">
                                    {Object.values(profile.skillRatings).filter(rating => rating >= 9 && rating <= 10).length}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-amber-200 bg-white/80">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-amber-800 text-lg">Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-slate-600 mb-3">
                                Based on your skills assessment, consider focusing on these areas:
                              </p>
                              <ul className="space-y-2 text-sm text-amber-800">
                                {Object.entries(profile.skillRatings)
                                  .sort(([, a], [, b]) => a - b)
                                  .slice(0, 2)
                                  .map(([skill], index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <ChevronRight className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                      <span>Improve your <span className="font-medium">{skill}</span> skills through online courses or workshops</span>
                                    </li>
                                  ))}
                                <li className="flex items-start gap-2">
                                  <ChevronRight className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                  <span>Consider getting certifications in your top skills to validate your expertise</span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRetake('skills')}
                            className="border-amber-200 text-amber-700 hover:bg-amber-50"
                          >
                            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                            Retake Assessment
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 bg-amber-50/50 rounded-lg">
                        <p className="text-slate-500 mb-4">Complete your skills assessment to see results</p>
                        <Button 
                          onClick={() => router.push('/assessment?type=skills')}
                          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                        >
                          <Rocket className="h-4 w-4 mr-2" />
                          Start Assessment
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}

// Helper function to get MBTI description
function getMBTIDescription(mbtiType: string): string {
  const descriptions: Record<string, string> = {
    'INTJ': 'The Architect - Strategic, innovative, and independent thinker with a drive for improvement and efficiency.',
    'INTP': 'The Logician - Analytical problem-solver with a thirst for knowledge and understanding of complex systems.',
    'ENTJ': 'The Commander - Decisive leader with a strategic vision and drive to implement long-term plans.',
    'ENTP': 'The Debater - Innovative and quick-thinking with an enthusiasm for new ideas and intellectual challenges.',
    'INFJ': 'The Advocate - Idealistic, principled, and insightful with a focus on helping others and making a difference.',
    'INFP': 'The Mediator - Creative, empathetic, and value-driven with a desire for meaningful work and authentic expression.',
    'ENFJ': 'The Protagonist - Charismatic and empathetic leader who inspires and develops others.',
    'ENFP': 'The Campaigner - Enthusiastic, creative, and people-oriented with a passion for possibilities and connections.',
    'ISTJ': 'The Logistician - Practical, detail-oriented, and reliable with a strong sense of duty and responsibility.',
    'ISFJ': 'The Defender - Dedicated, warm, and conscientious with a desire to protect and serve others.',
    'ESTJ': 'The Executive - Efficient, structured, and direct with a focus on implementing systems and traditions.',
    'ESFJ': 'The Consul - Caring, social, and organized with a desire to create harmony and meet others\' needs.',
    'ISTP': 'The Virtuoso - Practical problem-solver with technical expertise and a desire for hands-on experience.',
    'ISFP': 'The Adventurer - Artistic, sensitive, and present-focused with a desire for freedom and authentic expression.',
    'ESTP': 'The Entrepreneur - Energetic, action-oriented, and adaptable with a focus on immediate results.',
    'ESFP': 'The Entertainer - Spontaneous, enthusiastic, and people-oriented with a joy for life and experiences.'
  };
  
  return descriptions[mbtiType] || 'A unique personality type with its own special combination of preferences and traits.';
}

// Helper function to get MBTI work traits
function getMBTIWorkTraits(mbtiType: string): { title: string; description: string }[] {
  const traits: Record<string, { title: string; description: string }[]> = {
    'INTJ': [
      { title: 'Strategic Thinking', description: 'You excel at developing long-term plans and seeing the big picture.' },
      { title: 'Independent Work', description: 'You prefer autonomy and working with minimal supervision.' },
      { title: 'Analytical Problem-Solving', description: 'You approach challenges with logic and systematic thinking.' },
      { title: 'Continuous Improvement', description: 'You constantly seek ways to enhance systems and processes.' }
    ],
    'INTP': [
      { title: 'Conceptual Analysis', description: 'You excel at understanding complex theoretical concepts.' },
      { title: 'Independent Research', description: 'You work best when given freedom to explore ideas deeply.' },
      { title: 'Logical Problem-Solving', description: 'You approach challenges with precise, logical thinking.' },
      { title: 'Innovation', description: 'You enjoy developing new systems and theoretical models.' }
    ],
    'ENTJ': [
      { title: 'Leadership', description: 'You naturally take charge and organize people toward goals.' },
      { title: 'Strategic Planning', description: 'You excel at creating and implementing long-term visions.' },
      { title: 'Decision Making', description: 'You make confident, logical decisions efficiently.' },
      { title: 'Achievement Focus', description: 'You are driven to accomplish goals and measure success.' }
    ],
    // Add other MBTI types as needed
  };
  
  // Default traits if specific type not found
  const defaultTraits = [
    { title: 'Unique Perspective', description: 'Your personality type brings a valuable viewpoint to team discussions.' },
    { title: 'Natural Strengths', description: 'You have inherent talents that can be leveraged in your career path.' },
    { title: 'Work Preferences', description: 'Understanding your type helps identify environments where you will thrive.' },
    { title: 'Communication Style', description: 'Your type influences how you share and receive information with others.' }
  ];
  
  return traits[mbtiType] || defaultTraits;
}