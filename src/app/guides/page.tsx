"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BookOpen, Briefcase, GraduationCap, TrendingUp, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function GuidesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("all");
  const [visibleGuides, setVisibleGuides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample career guides data
  const careerGuides = [
    {
      id: 1,
      title: "Breaking into Tech: A Complete Roadmap",
      description: "A comprehensive guide to starting a career in technology, from learning to code to landing your first job.",
      category: "tech",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop",
      readTime: "15 min read",
      level: "Beginner"
    },
    {
      id: 2,
      title: "The Healthcare Career Handbook",
      description: "Explore various career paths in healthcare, from clinical roles to administrative positions.",
      category: "healthcare",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
      readTime: "12 min read",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Financial Services: Career Paths and Growth",
      description: "Navigate the complex world of finance and discover lucrative career opportunities.",
      category: "finance",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      readTime: "10 min read",
      level: "Advanced"
    },
    {
      id: 4,
      title: "Creative Careers in Digital Marketing",
      description: "Explore how creativity and analytics combine in the dynamic field of digital marketing.",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      readTime: "8 min read",
      level: "Beginner"
    },
    {
      id: 5,
      title: "Transitioning to Data Science",
      description: "A step-by-step guide for professionals looking to pivot their career into data science.",
      category: "tech",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      readTime: "20 min read",
      level: "Intermediate"
    },
    {
      id: 6,
      title: "Entrepreneurship: Starting Your Own Business",
      description: "Essential guidance for aspiring entrepreneurs from idea validation to launch.",
      category: "business",
      image: "https://images.unsplash.com/photo-1664575599736-c5197c684128?q=80&w=2070&auto=format&fit=crop",
      readTime: "18 min read",
      level: "Advanced"
    },
    {
      id: 7,
      title: "Education Careers Beyond Teaching",
      description: "Discover diverse career opportunities in the education sector that don't involve classroom teaching.",
      category: "education",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
      readTime: "9 min read",
      level: "Beginner"
    },
    {
      id: 8,
      title: "Sustainable Careers in Environmental Science",
      description: "Explore how you can make a positive impact on the planet through an environmental career.",
      category: "science",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
      readTime: "11 min read",
      level: "Intermediate"
    }
  ];

  // Filter guides based on search term and active tab
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      let filtered = careerGuides;
      
      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(guide => 
          guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          guide.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filter by category
      if (activeTab !== "all") {
        filtered = filtered.filter(guide => guide.category === activeTab);
      }
      
      setVisibleGuides(filtered);
      setIsLoading(false);
    }, 500);
  }, [searchTerm, activeTab]);

  return (
    <MainLayout>
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-amber-50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
              Resources
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">
              Career <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400">Guides</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Comprehensive resources to help you navigate your career journey with confidence.
            </p>
          </div>
          
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search career guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              
              <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
                <TabsList className="bg-white border border-amber-200 h-auto p-1">
                  <TabsTrigger value="all" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="tech" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                    Tech
                  </TabsTrigger>
                  <TabsTrigger value="business" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                    Business
                  </TabsTrigger>
                  <TabsTrigger value="healthcare" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                    Healthcare
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="bg-white border-amber-200 overflow-hidden">
                    <div className="h-48 bg-slate-200 animate-pulse" />
                    <CardHeader>
                      <div className="h-7 bg-slate-200 animate-pulse rounded w-3/4 mb-2" />
                      <div className="h-4 bg-slate-200 animate-pulse rounded w-1/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-slate-200 animate-pulse rounded w-full mb-2" />
                      <div className="h-4 bg-slate-200 animate-pulse rounded w-full mb-2" />
                      <div className="h-4 bg-slate-200 animate-pulse rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : visibleGuides.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleGuides.map((guide) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: guide.id * 0.1 }}
                  >
                    <Card className="bg-white border-amber-200 overflow-hidden h-full flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={guide.image} 
                          alt={guide.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-center mb-2">
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                            {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
                          </Badge>
                          <span className="text-sm text-slate-500">{guide.readTime}</span>
                        </div>
                        <CardTitle className="text-xl text-amber-800">{guide.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-slate-600">{guide.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="flex justify-between items-center w-full">
                          <span className="text-sm font-medium text-slate-500">
                            {guide.level}
                          </span>
                          <Button variant="ghost" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-0">
                            Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-amber-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">No guides found</h3>
                <p className="text-slate-600 mb-6">
                  We couldn't find any guides matching your search criteria.
                </p>
                <Button 
                  variant="outline" 
                  className="border-amber-500 text-amber-700 hover:bg-amber-50"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveTab('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-16 bg-white p-8 md:p-12 rounded-3xl border border-amber-200 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
                  Personalized Guidance
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
                  Need More Specific Career Advice?
                </h2>
                <p className="text-slate-700 mb-6">
                  Take our comprehensive assessment to receive personalized career recommendations and guidance tailored to your unique skills, personality, and preferences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-lg shadow-amber-500/20 text-white"
                  >
                    Take Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-amber-500 bg-white hover:bg-amber-50 text-amber-700 hover:text-amber-800 transition-colors"
                  >
                    Speak to a Coach
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                  <Briefcase className="h-8 w-8 text-amber-600 mb-4" />
                  <h3 className="font-bold text-amber-800 mb-2">Career Matching</h3>
                  <p className="text-slate-600">Find careers that align with your personality and skills</p>
                </div>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                  <GraduationCap className="h-8 w-8 text-amber-600 mb-4" />
                  <h3 className="font-bold text-amber-800 mb-2">Skill Development</h3>
                  <p className="text-slate-600">Identify skills to develop for your desired career path</p>
                </div>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                  <BookOpen className="h-8 w-8 text-amber-600 mb-4" />
                  <h3 className="font-bold text-amber-800 mb-2">Learning Resources</h3>
                  <p className="text-slate-600">Access curated resources to build your knowledge</p>
                </div>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                  <TrendingUp className="h-8 w-8 text-amber-600 mb-4" />
                  <h3 className="font-bold text-amber-800 mb-2">Career Growth</h3>
                  <p className="text-slate-600">Plan your long-term career progression and advancement</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6">
                <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">Free Webinars</h3>
                <p className="text-slate-600 mb-4">
                  Join our weekly webinars with industry experts discussing career trends and opportunities.
                </p>
                <Link href="/resources" className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center">
                  View Schedule <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6">
                <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">Career Workshops</h3>
                <p className="text-slate-600 mb-4">
                  Hands-on workshops to help you master essential skills for your career development.
                </p>
                <Link href="/resources" className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center">
                  Browse Workshops <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6">
                <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">Industry Insights</h3>
                <p className="text-slate-600 mb-4">
                  Stay updated with the latest trends and insights from various industries and sectors.
                </p>
                <Link href="/resources" className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center">
                  Read Insights <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}