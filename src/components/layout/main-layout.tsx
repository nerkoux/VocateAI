import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, ClipboardCheck, MessageSquare, User, CreditCard } from 'lucide-react';
import Image from 'next/image';

// Import Shadcn UI components
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Determine where the "Home" link should point
  const homeLink = status === 'authenticated' ? '/home' : '/';
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Navigation items - Added Pricing link
  const navItems = [
    { name: 'Home', href: homeLink, icon: <Home className="h-4 w-4 mr-2" /> },
    { name: 'Pricing', href: '/pricing', icon: <CreditCard className="h-4 w-4 mr-2" /> },
    ...(status === 'authenticated' 
      ? [
          { name: 'Assessment', href: '/assessment', icon: <ClipboardCheck className="h-4 w-4 mr-2" /> },
          { name: 'Consultation', href: '/consultation', icon: <MessageSquare className="h-4 w-4 mr-2" /> },
          { name: 'Profile', href: '/profile', icon: <User className="h-4 w-4 mr-2" /> },
        ] 
      : [])
  ];

  // Updated active link style to match amber theme
  const activeLinkClass = "text-white bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-l-2 border-amber-500";
  const inactiveLinkClass = "text-slate-300 hover:text-white hover:bg-amber-800/30";
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="border-b border-amber-800/30 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href={homeLink}>
            <div className="flex items-center space-x-2">
              {/* Updated logo container with amber theme */}
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-lg shadow-amber-500/20">
                <Image 
                  src="/logo/vocate-aiblackbg.png" 
                  alt="VocateAI Logo" 
                  width={32} 
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-500">
              VocateAI
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation - Updated with amber theme */}
          <nav className="hidden md:flex items-center space-x-1">
            <TooltipProvider>
              {navItems.map((item) => (
                <Tooltip key={item.name} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        pathname === item.href ? 'bg-amber-800/30 text-amber-400' : 'hover:bg-amber-800/20'
                      }`}
                      asChild
                    >
                      <Link href={item.href}>
                        <span className="flex items-center">
                          {item.icon}
                          {item.name}
                        </span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
            
            {/* Updated avatar with amber theme */}
            {status === 'authenticated' && (
              <Link href="/profile">
                <Avatar className="h-8 w-8 ml-2 border border-amber-700 cursor-pointer hover:border-amber-500 transition-colors">
                  <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || 'User'} />
                  <AvatarFallback className="bg-gradient-to-br from-amber-600 to-yellow-600">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Button - Updated with amber theme */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-amber-100">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-slate-900 border-amber-800/30 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-amber-800/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md shadow-amber-500/20">
                      <Image 
                        src="/logo/vocate-aiblackbg.png" 
                        alt="VocateAI Logo" 
                        width={24} 
                        height={24}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-500">
                    VocateAI
                    </span>
                  </div>
                </div>
                
                <nav className="flex-1 py-4">
                  <ul className="space-y-1 px-2">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Link 
                          href={item.href} 
                          onClick={closeMobileMenu}
                          className={`flex items-center px-4 py-3 rounded-md ${
                            pathname === item.href ? activeLinkClass : inactiveLinkClass
                          }`}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                {status === 'authenticated' && (
                  <div className="p-4 border-t border-amber-800/30 mt-auto">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8 border border-amber-700">
                        <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || 'User'} />
                        <AvatarFallback className="bg-gradient-to-br from-amber-600 to-yellow-600">
                          {session?.user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{session?.user?.name || 'User'}</p>
                        <p className="text-amber-400/70 text-xs truncate">{session?.user?.email || ''}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      <main>
        {children}
      </main>
    </div>
  );
}