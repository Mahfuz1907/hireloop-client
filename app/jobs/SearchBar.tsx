"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-800/80 bg-[#121216] p-4 shadow-xl md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, keywords..."
            className="h-12 w-full rounded-xl border-gray-800 bg-[#18181b] pl-11 text-sm text-white focus-visible:ring-indigo-500"
          />
        </div>
        <Button className="h-12 rounded-xl bg-indigo-600 px-8 text-xs font-medium text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500">
          Search Jobs
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
