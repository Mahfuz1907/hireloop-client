"use client"

import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useJobsSearch } from "./useJobsSearch"

const SearchBar = () => {
  const { searchParams, updateParams } = useJobsSearch()

  const urlSearch = searchParams.get("search") ?? ""
  const urlLocation = searchParams.get("location") ?? ""

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      string
    >

    updateParams({
      search: form.search?.trim() || null,
      location: form.location?.trim() || null,
    })
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* The key resets the uncontrolled inputs whenever the URL's
          search/location change (e.g. back/forward navigation). */}
      <form
        key={`${urlSearch}|${urlLocation}`}
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-2xl border border-gray-800/80 bg-[#121216] p-4 shadow-xl md:flex-row md:items-center"
      >
        {/* Keyword Input */}
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            name="search"
            defaultValue={urlSearch}
            placeholder="Search by job title, keywords..."
            className="h-12 w-full rounded-xl border-gray-800 bg-[#18181b] pl-11 text-sm text-white focus-visible:ring-indigo-500"
          />
        </div>

        {/* Location Input */}
        <div className="relative flex-1">
          <MapPin className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            name="location"
            defaultValue={urlLocation}
            placeholder="Location or Remote"
            className="h-12 w-full rounded-xl border-gray-800 bg-[#18181b] pl-11 text-sm text-white focus-visible:ring-indigo-500"
          />
        </div>

        <Button
          type="submit"
          className="h-12 rounded-xl bg-indigo-600 px-8 text-xs font-medium text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
        >
          Search Jobs
        </Button>
      </form>
    </div>
  )
}

export default SearchBar
