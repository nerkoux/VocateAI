"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, X, Check, ChevronRight, Sparkles, Heart, BookOpen, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

// Predefined options for dropdowns remain the same
const interestOptions = [
  "Technology", "Science", "Art", "Music", "Writing", "Sports", "Travel", 
  "Cooking", "Photography", "Gaming", "Reading", "Nature", "Fashion", 
  "Finance", "Education", "Healthcare", "Social Impact"
];

const valueOptions = [
  "Creativity", "Innovation", "Leadership", "Teamwork", "Independence", 
  "Work-Life Balance", "Financial Security", "Social Impact", "Learning", 
  "Recognition", "Adventure", "Stability", "Diversity", "Integrity"
];

const philosophyOptions = [
  "Growth Mindset", "Continuous Learning", "Work to Live", "Live to Work", 
  "Make a Difference", "Follow Your Passion", "Balance in All Things", 
  "Excellence in Everything", "Practical Outcomes", "Innovation First"
];

export default function PersonalPreferences() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("interests");
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // State for user preferences
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const [newValue, setNewValue] = useState('');
  const [philosophy, setPhilosophy] = useState<string>('');
  const [careerGoals, setCareerGoals] = useState<string>('');
  
  // Calculate completion progress
  useEffect(() => {
    let completed = 0;
    let total = 4; // Total number of sections
    
    if (interests.length > 0) completed++;
    if (values.length > 0) completed++;
    if (philosophy) completed++;
    if (careerGoals) completed++;
    
    setProgress((completed / total) * 100);
  }, [interests, values, philosophy, careerGoals]);
  
  // Check if MBTI assessment is completed
  useEffect(() => {
    const mbtiResult = localStorage.getItem('mbtiResult');
    if (!mbtiResult) {
      alert("Please complete the MBTI assessment first.");
      router.push('/assessment');
    }
  }, [router]);
  
  // Load existing preferences if available - logic remains the same
  useEffect(() => {
    const loadPreferences = async () => {
      // Try to get from localStorage first
      const localPreferences = localStorage.getItem('personalPreferences');
      if (localPreferences) {
        try {
          const parsed = JSON.parse(localPreferences);
          if (parsed.customSkills) setCustomSkills(parsed.customSkills);
          if (parsed.interests) setInterests(parsed.interests);
          if (parsed.values) setValues(parsed.values);
          if (parsed.philosophy) setPhilosophy(parsed.philosophy);
          if (parsed.careerGoals) setCareerGoals(parsed.careerGoals);
        } catch (e) {
          console.error('Error parsing preferences:', e);
        }
      }
      
      // If authenticated, try to get from server
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/user');
          const data = await response.json();
          
          if (data.user && data.user.personalPreferences) {
            const prefs = data.user.personalPreferences;
            if (prefs.customSkills) setCustomSkills(prefs.customSkills);
            if (prefs.interests) setInterests(prefs.interests);
            if (prefs.values) setValues(prefs.values);
            if (prefs.philosophy) setPhilosophy(prefs.philosophy);
            if (prefs.careerGoals) setCareerGoals(prefs.careerGoals);
          }
        } catch (error) {
          console.error('Error fetching user preferences:', error);
        }
      }
    };
    
    loadPreferences();
  }, [status]);
  
  // Handler functions remain the same
  const handleAddSkill = () => {
    if (newSkill && !customSkills.includes(newSkill)) {
      setCustomSkills([...customSkills, newSkill]);
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setCustomSkills(customSkills.filter(s => s !== skill));
  };
  
  const handleAddInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest('');
    }
  };
  
  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };
  
  const handleAddValue = () => {
    if (newValue && !values.includes(newValue)) {
      setValues([...values, newValue]);
      setNewValue('');
    }
  };
  
  const handleRemoveValue = (value: string) => {
    setValues(values.filter(v => v !== value));
  };
  
  const handleSelectInterest = (interest: string) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
  };
  
  const handleSelectValue = (value: string) => {
    if (!values.includes(value)) {
      setValues([...values, value]);
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Handle form submission - logic remains the same
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare preferences data
      const preferencesData = {
        customSkills,
        interests,
        values,
        philosophy,
        careerGoals,
        completedAt: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem('personalPreferences', JSON.stringify(preferencesData));
      localStorage.setItem('preferencesCompleted', 'true');
      
      // If authenticated, save to database
      if (status === 'authenticated') {
        const response = await fetch('/api/user/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            personalPreferences: preferencesData,
            preferencesCompleted: true
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to save preferences');
        }
        
        // Pre-generate updated career guidance with preferences
        try {
          const mbtiResult = localStorage.getItem('mbtiResult');
          const skillRatings = localStorage.getItem('skillRatings') 
            ? JSON.parse(localStorage.getItem('skillRatings') || '{}') 
            : {};
            
          await fetch('/api/career-guidance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mbtiType: mbtiResult,
              skills: skillRatings,
              preferences: preferencesData
            }),
          });
        } catch (error) {
          console.error('Error pre-generating career guidance:', error);
          // Continue even if guidance generation fails
        }
      }
      
      // Show success animation
      setShowConfetti(true);
      
      // Redirect to assessment hub with completion status after a short delay
      setTimeout(() => {
        router.push('/assessment?completed=preferences');
      }, 1500);
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('There was an error saving your preferences. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render confetti effect
  useEffect(() => {
    if (showConfetti) {
      const confetti = async () => {
        const module = await import('canvas-confetti');
        module.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      };
      confetti();
    }
  }, [showConfetti]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-2 text-amber-900"
            >
              Personal Preferences
            </motion.h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto mb-4 rounded-full"></div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-700 max-w-2xl mx-auto"
            >
              Tell us more about your personal preferences to help us provide more tailored career recommendations.
            </motion.p>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-amber-700">Completion Progress</span>
              <span className="text-sm text-amber-700">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-amber-100" />
          </div>
          
          <Card className="mb-8 border-amber-200 bg-white shadow-lg">
            <CardHeader className="pb-2 border-b border-amber-100">
              <CardTitle className="text-xl text-amber-900">Navigation</CardTitle>
              <CardDescription className="text-slate-600">Complete each section to personalize your career guidance</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="interests" value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-amber-50 p-1">
                  <TabsTrigger 
                    value="interests" 
                    className="flex items-center text-amber-800 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="hidden md:inline">Interests</span>
                    <span className="md:hidden">Interests</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="values" 
                    className="flex items-center text-amber-800 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    <span className="hidden md:inline">Values</span>
                    <span className="md:hidden">Values</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="philosophy" 
                    className="flex items-center text-amber-800 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span className="hidden md:inline">Philosophy</span>
                    <span className="md:hidden">Philosophy</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="goals" 
                    className="flex items-center text-amber-800 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    <span className="hidden md:inline">Career Goals</span>
                    <span className="md:hidden">Goals</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="interests" className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <Label htmlFor="interest-select" className="mb-2 block text-amber-800">Select from common interests</Label>
                        <Select onValueChange={handleSelectInterest}>
                          <SelectTrigger id="interest-select" className="border-amber-200 focus:ring-amber-500 text-amber-900">
                            <SelectValue placeholder="Select an interest" className="text-amber-500" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-amber-200">
                            {interestOptions.map((option) => (
                              <SelectItem 
                                key={option} 
                                value={option} 
                                className="text-amber-900 focus:bg-amber-50 focus:text-amber-900 data-[highlighted]:bg-amber-50 data-[highlighted]:text-amber-900"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex-1">
                        <Label htmlFor="custom-interest" className="mb-2 block text-amber-800">Or add your own</Label>
                        <div className="flex gap-2">
                        <Input
                            id="custom-interest"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            placeholder="Enter interest..."
                            className="flex-1 border-amber-200 focus:ring-amber-500"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddInterest()}
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button onClick={handleAddInterest} variant="outline" size="icon" className="border-amber-300 hover:bg-amber-50">
                                  <PlusCircle className="h-4 w-4 text-amber-600" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Add custom interest</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block text-amber-800">Your selected interests</Label>
                      <ScrollArea className="h-[120px] rounded-md border border-amber-200 p-4 bg-amber-50/50">
                        <div className="flex flex-wrap gap-2">
                          {interests.length === 0 ? (
                            <p className="text-amber-600 italic">No interests selected yet</p>
                          ) : (
                            interests.map((interest, index) => (
                              <motion.div 
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 px-3 py-1 rounded-full flex items-center border border-amber-200 shadow-sm"
                              >
                                {interest}
                                <button 
                                  onClick={() => handleRemoveInterest(interest)}
                                  className="ml-2 text-amber-500 hover:text-amber-700 transition-colors"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </motion.div>
                            ))
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => setActiveTab("values")} 
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                    >
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="values" className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <Label htmlFor="value-select" className="mb-2 block text-amber-800">Select from common values</Label>
                        <Select onValueChange={handleSelectValue}>
                          <SelectTrigger id="value-select" className="border-amber-200 focus:ring-amber-500 text-amber-900">
                            <SelectValue placeholder="Select a value" className="text-amber-500" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-amber-200">
                            {valueOptions.map((option) => (
                              <SelectItem 
                                key={option} 
                                value={option} 
                                className="text-amber-900 focus:bg-amber-50 focus:text-amber-900 data-[highlighted]:bg-amber-50 data-[highlighted]:text-amber-900"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex-1">
                        <Label htmlFor="custom-value" className="mb-2 block text-amber-800">Or add your own</Label>
                        <div className="flex gap-2">
                          <Input
                            id="custom-value"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            placeholder="Enter value..."
                            className="flex-1 border-amber-200 focus:ring-amber-500"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddValue()}
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button onClick={handleAddValue} variant="outline" size="icon" className="border-amber-300 hover:bg-amber-50">
                                  <PlusCircle className="h-4 w-4 text-amber-600" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Add custom value</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block text-amber-800">Your selected values</Label>
                      <ScrollArea className="h-[120px] rounded-md border border-amber-200 p-4 bg-amber-50/50">
                        <div className="flex flex-wrap gap-2">
                          {values.length === 0 ? (
                            <p className="text-amber-600 italic">No values selected yet</p>
                          ) : (
                            values.map((value, index) => (
                              <motion.div 
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 px-3 py-1 rounded-full flex items-center border border-amber-200 shadow-sm"
                              >
                                {value}
                                <button 
                                  onClick={() => handleRemoveValue(value)}
                                  className="ml-2 text-amber-500 hover:text-amber-700 transition-colors"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </motion.div>
                            ))
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      onClick={() => setActiveTab("interests")} 
                      variant="outline"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                      Previous
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("philosophy")} 
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                    >
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="philosophy" className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="philosophy-select" className="mb-2 block text-amber-800">Select your work philosophy</Label>
                      <Select onValueChange={(value) => setPhilosophy(value)} value={philosophy}>
                        <SelectTrigger id="philosophy-select" className="border-amber-200 focus:ring-amber-500 text-amber-900">
                          <SelectValue placeholder="Select a philosophy" className="text-amber-500" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-amber-200">
                          {philosophyOptions.map((option) => (
                            <SelectItem 
                              key={option} 
                              value={option} 
                              className="text-amber-900 focus:bg-amber-50 focus:text-amber-900 data-[highlighted]:bg-amber-50 data-[highlighted]:text-amber-900"
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="philosophy-custom" className="mb-2 block text-amber-800">Or describe your own philosophy</Label>
                      <Textarea 
                        id="philosophy-custom"
                        value={philosophyOptions.includes(philosophy) ? "" : philosophy}
                        onChange={(e) => setPhilosophy(e.target.value)}
                        placeholder="Describe your work philosophy..."
                        className="min-h-[100px] border-amber-200 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      onClick={() => setActiveTab("values")} 
                      variant="outline"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                      Previous
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("goals")} 
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                    >
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="goals" className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="career-goals" className="mb-2 block text-amber-800">Describe your career goals</Label>
                      <Textarea 
                        id="career-goals"
                        value={careerGoals}
                        onChange={(e) => setCareerGoals(e.target.value)}
                        placeholder="What are your short and long-term career aspirations?"
                        className="min-h-[150px] border-amber-200 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      onClick={() => setActiveTab("philosophy")} 
                      variant="outline"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                      Previous
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting || progress < 100}
                      className={`${progress < 100 ? 'bg-amber-300' : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600'} text-white`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <span className="mr-2">Saving...</span>
                          <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span>Save Preferences</span>
                          <Check className="ml-2 h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t border-amber-100 pt-4 text-sm text-amber-700">
              <p>Complete all sections to get the most personalized career recommendations.</p>
            </CardFooter>
          </Card>
          
          <div className="text-center text-slate-500 text-sm">
            Your preferences help us understand your career aspirations and provide more tailored guidance.
          </div>
        </motion.div>
      </div>
      
      {isSubmitting && (
        <div className="fixed inset-0 bg-amber-900/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl border border-amber-200">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-500 mx-auto mb-4"></div>
            <p className="text-center text-amber-800">Saving your preferences...</p>
            <p className="text-center text-slate-600 text-sm mt-2">This will only take a moment</p>
          </div>
        </div>
      )}
    </div>
  );
}

