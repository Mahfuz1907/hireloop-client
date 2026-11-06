'use client'

import React, { useState } from "react";
import Link from "next/link"; // or react-router-dom Link
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/companies" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="w-full bg-[#121214] text-white border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
            <Image 
                src="/images/logo.png"
                alt="HireLoop Logo" 
                width={120} 
                height={36} 
                priority 
            />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm text-zinc-300 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-700" />

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Sign In
            </Link>
            
            <Button
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Navigation (Hamburger Menu) */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="text-zinc-300 hover:text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-[#121214] text-white border-zinc-800">
              <SheetHeader>
                  <Image 
                    src="/images/logo.png"
                    alt="HireLoop Logo" 
                    width={120} 
                    height={36} 
                    priority 
                  />
              </SheetHeader>

              <div className="flex flex-col gap-6 mt-8 ml-5">
                <div className="flex flex-col gap-4 text-base text-zinc-300 font-medium">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-white transition-colors py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <hr className="border-zinc-800" />

                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-2 text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
                  >
                    Sign In
                  </Link>

                  <Button
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}