"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, User, Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<"seeker" | "recruiter">("seeker");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ekhane apnar signup/better-auth logic thakbe
    console.log("Signing up as:", role, formData);
    
    // Success hole dashboard ba login page-e redirect korte paren
    if (role === "seeker") {
      router.push("/dashboard/seeker");
    } else {
      router.push("/dashboard/recruiter");
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
          <p className="text-zinc-400 text-sm mt-2">Create your account to get started</p>
        </div>

        <Card className="bg-[#121216] border-zinc-800 text-white shadow-2xl rounded-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold tracking-tight text-center">Create an Account</CardTitle>
            <CardDescription className="text-center text-zinc-400 text-sm">
              Choose your role and enter your details below
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Role Selector Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setRole("seeker")}
                className={`py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                  role === "seeker"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <User className="w-4 h-4" />
                Job Seeker
              </button>
              
              <button
                type="button"
                onClick={() => setRole("recruiter")}
                className={`py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                  role === "recruiter"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Recruiter
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-zinc-300 text-xs font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                  <Input 
                    type="text" 
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#18181c] border-zinc-800 text-white pl-10 focus-visible:ring-indigo-600 rounded-xl py-5"
                  />
                </div>
              </div>

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
                <Label className="text-zinc-300 text-xs font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                  <Input 
                    type="password" 
                    name="password"
                    required
                    placeholder="Create a strong password"
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
                Create {role === "seeker" ? "Seeker" : "Recruiter"} Account
                <ArrowRight className="w-4 h-4" />
              </Button>

            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-zinc-800/80 py-4">
            <p className="text-xs text-zinc-400">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}