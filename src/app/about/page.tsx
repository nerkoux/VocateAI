"use client";

import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Users, Award, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = React.useState('mission');

  return (
    <MainLayout>
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-amber-50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 transition-colors">
              About Us
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">
              Our Mission to Transform <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400">Career Discovery</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Learn about our journey, mission, and the team behind VocateAI.
            </p>
          </div>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 max-w-2xl mx-auto mb-8">
              <TabsTrigger 
                value="mission" 
                className="text-slate-700 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-700"
              >
                <Lightbulb className="mr-2 h-4 w-4" /> Mission
              </TabsTrigger>
              <TabsTrigger 
                value="story" 
                className="text-slate-700 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-700"
              >
                <Building className="mr-2 h-4 w-4" /> Our Story
              </TabsTrigger>
              <TabsTrigger 
                value="team" 
                className="text-slate-700 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-700"
              >
                <Users className="mr-2 h-4 w-4" /> Team
              </TabsTrigger>
              <TabsTrigger 
                value="values" 
                className="text-slate-700 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-700"
              >
                <Award className="mr-2 h-4 w-4" /> Values
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mission" className="space-y-6">
              <Card className="bg-white border-amber-200">
                <CardContent className="pt-6">
                  <div className="prose max-w-none text-slate-700">
                    <h2 className="text-2xl font-bold text-amber-800 mb-4">Our Mission</h2>
                    <p>
                      At VocateAI, our mission is to empower individuals to discover career paths that truly align with their unique personalities, skills, and preferences. We believe that finding fulfilling work is a fundamental right, and our AI-powered platform is designed to make this journey accessible to everyone.
                    </p>
                    <p>
                      We're committed to reducing career uncertainty and helping people make informed decisions about their professional futures. By combining cutting-edge technology with established career development frameworks, we provide personalized guidance that considers the whole person—not just their resume.
                    </p>
                    <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">What We're Solving</h3>
                    <ul className="space-y-2">
                      <li>The overwhelming nature of career decisions with too many options</li>
                      <li>The disconnect between education and career satisfaction</li>
                      <li>The lack of personalized guidance in traditional career counseling</li>
                      <li>The rapidly changing job market that makes career planning difficult</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="story" className="space-y-6">
              <Card className="bg-white border-amber-200">
                <CardContent className="pt-6">
                  <div className="prose max-w-none text-slate-700">
                    <h2 className="text-2xl font-bold text-amber-800 mb-4">Our Story</h2>
                    <p>
                      VocateAI was founded in 2025 by the team  CipherStorm.
                    </p>
                    <p>
                      Our founders experienced firsthand the challenges of career indecision and the limitations of traditional career counseling. They recognized that AI and machine learning could transform this space by providing truly personalized guidance at scale.
                    </p>
                    <h3 className="text-xl font-bold text-amber-800 mt-6 mb-3">Our Journey</h3>
                    <p>
                      We began by building a comprehensive database of career paths, skills, and personality factors. We then developed sophisticated algorithms that could match individuals to careers based on multiple dimensions of compatibility.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team" className="space-y-6">
              <Card className="bg-white border-amber-200">
                <CardContent className="pt-6">
                  <div className="prose max-w-none text-slate-700">
                    <h2 className="text-2xl font-bold text-amber-800 mb-4">Our Team</h2>
                    <p>
                      VocateAI is powered by a diverse team of experts who bring together knowledge from data science and artifical intelligence
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl font-bold text-amber-700">AM</span>
                        </div>
                        <h3 className="text-xl font-bold text-amber-800">Akshat Mehta</h3>
                        <p className="text-sm text-slate-600 mb-2">Frontend Developer</p>
                        <p className="text-sm">
                          Akshat played a major role developing a frontend of this whole career kiosk system
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl font-bold text-amber-700">DG</span>
                        </div>
                        <h3 className="text-xl font-bold text-amber-800">Divyanshu Garg</h3>
                        <p className="text-sm text-slate-600 mb-2">UI/UX Designer</p>
                        <p className="text-sm">
                          Divyanshu designed the User-Interface of this Kiosk System
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl font-bold text-amber-700">AS</span>
                        </div>
                        <h3 className="text-xl font-bold text-amber-800">Abhiuday Surya</h3>
                        <p className="text-sm text-slate-600 mb-2">Backend Developer</p>
                        <p className="text-sm">
                          Integration of AI-Models and SSR Integration
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl font-bold text-amber-700">KS</span>
                        </div>
                        <h3 className="text-xl font-bold text-amber-800">Kshitij Singh</h3>
                        <p className="text-sm text-slate-600 mb-2">Backend Developer</p>
                        <p className="text-sm">
                          Managed the Relational Database for this project 
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="values" className="space-y-6">
              <Card className="bg-white border-amber-200">
                <CardContent className="pt-6">
                  <div className="prose max-w-none text-slate-700">
                    <h2 className="text-2xl font-bold text-amber-800 mb-4">Our Values</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                      <div className="bg-amber-50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-amber-800 mb-3">Personalization</h3>
                        <p>
                          We believe that career guidance should be as unique as you are. Our recommendations are tailored to your specific combination of traits, skills, and preferences.
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-amber-800 mb-3">Accessibility</h3>
                        <p>
                          Quality career guidance should be available to everyone, regardless of background or resources. We're committed to making our platform accessible and inclusive.
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-amber-800 mb-3">Empowerment</h3>
                        <p>
                          We don't just provide recommendations—we give you the insights and resources you need to take control of your career journey with confidence.
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-amber-800 mb-3">Innovation</h3>
                        <p>
                          We continuously improve our algorithms and assessments to provide the most accurate and helpful career guidance possible.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
}