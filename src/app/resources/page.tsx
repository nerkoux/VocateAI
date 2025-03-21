"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BookOpen, Video, FileText, Download, ExternalLink, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState('');

  // Sample resources data
  const resources = [
    {
      id: 1,
      title: "Resume Writing Masterclass",
      description: "Learn how to craft a compelling resume that stands out to recruiters and hiring managers.",
      type: "video",
      category: "job-search",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
      duration: "45 min",
      author: "Sarah Johnson, Career Coach"
    },
    {
      id: 2,
      title: "Networking Strategies for Introverts",
      description: "Effective networking techniques specially designed for professionals who identify as introverts.",
      type: "ebook",
      category: "networking",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
      pages: "32 pages",
      author: "Michael Chen, Career Strategist"
    },
    {
      id: 3,
      title: "Salary Negotiation Templates",
      description: "Ready-to-use email templates and scripts for negotiating your salary and benefits package.",
      type: "template",
      category: "negotiation",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
      format: "PDF, DOCX",
      author: "Financial Career Institute"
    },
    {
      id: 4,
      title: "Technical Interview Preparation Guide",
      description: "Comprehensive guide to preparing for technical interviews in software engineering roles.",
      type: "guide",
      category: "interviews",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
      pages: "78 pages",
      author: "Tech Careers Academy"
    },
    {
      id: 5,
      title: "LinkedIn Profile Optimization Workshop",
      description: "Step-by-step workshop to enhance your LinkedIn profile and attract recruiters.",
      type: "video",
      category: "personal-branding",
      image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=2070&auto=format&fit=crop",
      duration: "60 min",
      author: "Alex Rivera, LinkedIn Specialist"
    },
    {
      id: 6,
      title: "Career Transition Workbook",
      description: "Interactive workbook to guide you through the process of changing careers successfully.",
      type: "workbook",
      category: "career-change",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
      pages: "45 pages",
      author: "Career Pivot Institute"
    }
  ];

  // Filter resources based on search and active tab
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || resource.type === activeTab;
    
    return matchesSearch && matchesTab;
  });

  // Resource type icon mapping
  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'ebook':
      case 'guide':
        return <BookOpen className="h-5 w-5" />;
      case 'template':
      case 'workbook':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <MainLayout>
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-amber-50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
              Resources
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">
              Learning <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400">Resources</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Explore our curated collection of resources to enhance your career development journey.
            </p>
          </div>
          
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search resources..."
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
                  <TabsTrigger value="video" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                    Videos
                  </TabsTrigger>
                  <TabsTrigger value="ebook" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                    E-Books
                  </TabsTrigger>
                  <TabsTrigger value="template" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                    Templates
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {filteredResources.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: resource.id * 0.1 }}
                  >
                    <Card className="bg-white border-amber-200 overflow-hidden h-full flex flex-col">
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={resource.image} 
                          alt={resource.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                          {getResourceIcon(resource.type)}
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-center mb-2">
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                          </Badge>
                          <span className="text-sm text-slate-500">
                            {resource.duration || resource.pages || resource.format}
                          </span>
                        </div>
                        <CardTitle className="text-xl text-amber-800">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-slate-600 mb-3">{resource.description}</p>
                        <p className="text-sm text-slate-500">By {resource.author}</p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="flex justify-between items-center w-full">
                          <Badge variant="outline" className="border-amber-200 text-amber-700">
                            {resource.category.split('-').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </Badge>
                          <Button variant="ghost" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-0">
                            {resource.type === 'video' ? 'Watch Now' : 'Download'} <ArrowRight className="ml-2 h-4 w-4" />
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
                <h3 className="text-xl font-bold text-slate-700 mb-2">No resources found</h3>
                <p className="text-slate-600 mb-6">
                  We couldn't find any resources matching your search criteria.
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
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
                Premium Content
              </Badge>
              <h2 className="text-3xl font-bold mb-4 text-slate-800">
                Unlock Advanced Resources
              </h2>
              <p className="text-slate-700 max-w-3xl mx-auto">
                Get access to our premium library of career development resources, including in-depth courses, exclusive workshops, and personalized coaching.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-amber-800 mb-3">Basic</h3>
                  <div className="text-3xl font-bold text-slate-800 mb-4">Free</div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-amber-700">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      Access to basic resources
                    </li>
                    <li className="flex items-center text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-amber-700">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      Career assessment tools
                    </li>
                    <li className="flex items-center text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-amber-700">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      Community forum access
                    </li>
                  </ul>
                  <Button className="w-full bg-white border-amber-500 text-amber-700 hover:bg-amber-50">
                    Current Plan
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-amber-500 to-yellow-500 border-amber-400 text-white relative">
                <div className="absolute top-0 right-0 bg-white text-amber-700 font-bold py-1 px-3 rounded-bl-lg rounded-tr-lg text-sm">
                  Popular
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3">Standard</h3>
                  <div className="text-3xl font-bold text-white mb-4">₹399<span className="text-base font-normal">/month</span></div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-white">
                      <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      All basic features
                    </li>
                    <li className="flex items-center text-white">
                      <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      Premium resources access
                    </li>
                    <li className="flex items-center text-white">
                      <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      Monthly webinars
                    </li>
                    <li className="flex items-center text-white">
                      <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      Priority support
                    </li>
                  </ul>
                  <Button className="w-full bg-white hover:bg-slate-100 text-amber-600">
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-amber-200">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-amber-800 mb-3">Premium</h3>
                  <div className="text-3xl font-bold text-slate-800 mb-4">₹999<span className="text-base font-normal">/month</span></div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-amber-700">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      All Pro features
                    </li>
                    <li className="flex items-center text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-amber-700">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      1-on-1 career coaching
                    </li>
                    <li className="flex items-center text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-amber-700">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      Resume review service
                    </li>
                    <li className="flex items-center text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-amber-700">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      Exclusive industry insights
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full border-amber-500 text-amber-700 hover:bg-amber-50">
                    Upgrade to Pro
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <p className="text-slate-600 mb-4">
                Not sure which plan is right for you? Try Pro free for 14 days.
              </p>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white">
                Start Free Trial
              </Button>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-amber-200">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">Join Our Newsletter</h3>
              <p className="text-slate-600 mb-6">
                Stay updated with the latest career resources, industry trends, and exclusive content delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="Enter your email" 
                  className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                />
                <Button className="bg-amber-500 hover:bg-amber-600 text-white whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-amber-200">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">Need Help?</h3>
              <p className="text-slate-600 mb-6">
                Our team is here to help you find the right resources for your career development needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50 flex-1">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Chat
                </Button>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white flex-1">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}