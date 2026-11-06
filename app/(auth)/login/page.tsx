"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ekhane apnar authentication/login logic (yemon better-auth) thakbe
    console.log("Logging in with:", formData);
    
    // Example redirection based on role/email check
    if (formData.email.includes("admin")) {
      router.push("/dashboard/admin");
    } else if (formData.email.includes("recruiter")) {
      router.push("/dashboard/recruiter");
    } else {
      router.push("/dashboard/seeker");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Logo Section */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href={'/'}>
            <Image 
                src="/images/logo.png"
                alt="HireLoop Logo" 
                width={120} 
                height={36} 
                priority 
            />
          </Link>
          <p className="text-zinc-400 text-sm mt-2">Welcome back! Please enter your details</p>
        </div>

        <Card className="bg-[#121216] border-zinc-800 text-white shadow-2xl rounded-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold tracking-tight text-center">Sign In</CardTitle>
            <CardDescription className="text-center text-zinc-400 text-sm">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email */}
              <div className="space-y-2">
                <Label className="text-zinc-300 text-xs font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                  <Input 
                    type="email" 
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#18181c] border-zinc-800 text-white pl-10 focus-visible:ring-indigo-600 rounded-xl py-5"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-zinc-300 text-xs font-medium">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                  <Input 
                    type="password" 
                    name="password"
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-[#18181c] border-zinc-800 text-white pl-10 focus-visible:ring-indigo-600 rounded-xl py-5"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-6 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </Button>

            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-zinc-800/80 py-4">
            <p className="text-xs text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}