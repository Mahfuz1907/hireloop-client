"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroHeader() {
  const router = useRouter()
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword.trim()) params.append("search", keyword.trim())
    if (location.trim()) params.append("location", location.trim())

    // Redirects to the Browse Jobs page with query params
    router.push(`/jobs?${params.toString()}`)
  }

  const handleTrendingClick = (tag: string) => {
    router.push(`/jobs?search=${encodeURIComponent(tag)}`)
  }

  const trendingTags = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
  ]

  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden bg-[#0a0a0c] px-4 pt-12 pb-8 text-center text-white sm:px-6">
      {/* Top Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs text-zinc-300 shadow-inner sm:text-sm">
        <Briefcase className="h-4 w-4 text-orange-500" />
        <span>50,000+ NEW JOBS THIS MONTH</span>
      </div>

      {/* Headline */}
      <h1 className="mb-4 max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
        Find Your Dream Job Today
      </h1>

      {/* Subheadline */}
      <p className="mb-8 max-w-2xl text-sm text-zinc-400 sm:text-base md:text-lg">
        HireLoop connects top talent with world-class companies. Browse
        thousands of curated opportunities and land your next role — faster.
      </p>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-3xl flex-col items-center gap-2 rounded-2xl border border-zinc-800 bg-[#141417] p-2 shadow-2xl sm:flex-row sm:p-2.5"
      >
        {/* Job Title / Keyword Input */}
        <div className="flex w-full items-center gap-3 bg-transparent px-3 py-2 text-zinc-200 sm:w-1/2">
          <Search className="h-5 w-5 shrink-0 text-zinc-500" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title, skill or company"
            className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </div>

        <div className="hidden h-6 w-px bg-zinc-800 sm:block" />

        {/* Location Input */}
        <div className="flex w-full items-center gap-3 bg-transparent px-3 py-2 text-zinc-200 sm:w-1/2">
          <MapPin className="h-5 w-5 shrink-0 text-zinc-500" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location or Remote"
            className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 sm:w-auto"
        >
          <Search className="mr-2 h-4 w-4 sm:hidden" />
          Search Jobs
        </Button>
      </form>

      {/* Trending Positions */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400 sm:text-sm">
        <span className="font-medium text-zinc-500">Trending Position:</span>
        {trendingTags.map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => handleTrendingClick(tag)}
            className="cursor-pointer rounded-full border border-zinc-800 bg-[#18181b] px-3 py-1 text-zinc-300 transition-all hover:border-zinc-700"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
