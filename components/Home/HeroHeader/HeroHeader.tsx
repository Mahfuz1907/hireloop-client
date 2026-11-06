"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroHeader() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.append("keyword", keyword.trim());
    if (location.trim()) params.append("location", location.trim());
    
    // Redirects to the Browse Jobs page with query params
    router.push(`/jobs?${params.toString()}`);
  };

  const handleTrendingClick = (tag: string) => {
    router.push(`/jobs?keyword=${encodeURIComponent(tag)}`);
  };

  const trendingTags = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

  return (
    <div className="relative w-full bg-[#0a0a0c] text-white pt-12 pb-8 px-4 sm:px-6 flex flex-col items-center text-center overflow-hidden">
      
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-300 shadow-inner mb-6">
        <Briefcase className="w-4 h-4 text-orange-500" />
        <span>50,000+ NEW JOBS THIS MONTH</span>
      </div>

      {/* Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl mb-4 text-white">
        Find Your Dream Job Today
      </h1>

      {/* Subheadline */}
      <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mb-8">
        HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
      </p>

      {/* Search Form */}
      <form 
        onSubmit={handleSearch}
        className="w-full max-w-3xl bg-[#141417] border border-zinc-800 rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 shadow-2xl"
      >
        
        {/* Job Title / Keyword Input */}
        <div className="flex items-center gap-3 w-full sm:w-1/2 px-3 py-2 bg-transparent text-zinc-200">
          <Search className="w-5 h-5 text-zinc-500 shrink-0" />
          <input 
            type="text" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title, skill or company" 
            className="w-full bg-transparent border-none outline-none text-sm placeholder:text-zinc-500 text-white"
          />
        </div>

        <div className="hidden sm:block h-6 w-px bg-zinc-800" />

        {/* Location Input */}
        <div className="flex items-center gap-3 w-full sm:w-1/2 px-3 py-2 bg-transparent text-zinc-200">
          <MapPin className="w-5 h-5 text-zinc-500 shrink-0" />
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location or Remote" 
            className="w-full bg-transparent border-none outline-none text-sm placeholder:text-zinc-500 text-white"
          />
        </div>

        {/* Search Button */}
        <Button 
          type="submit"
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/20"
        >
          <Search className="w-4 h-4 sm:hidden mr-2" />
          Search Jobs
        </Button>

      </form>

      {/* Trending Positions */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-xs sm:text-sm text-zinc-400">
        <span className="text-zinc-500 font-medium">Trending Position:</span>
        {trendingTags.map((tag) => (
          <button 
            type="button"
            key={tag}
            onClick={() => handleTrendingClick(tag)}
            className="px-3 py-1 rounded-full bg-[#18181b] border border-zinc-800 text-zinc-300 hover:border-zinc-700 transition-all cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>

    </div>
  );
}