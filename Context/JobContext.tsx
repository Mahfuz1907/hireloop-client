"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react"

interface JobContextTypes {
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
  filter: string[]
  setFilter: Dispatch<SetStateAction<string[]>>
}

export const JobContext = createContext<JobContextTypes>({
  searchQuery: "",
  setSearchQuery: () => {},
  filter: [],
  setFilter: () => {},
})

const JobProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filter, setFilter] = useState<string[]>([])

  const sharedData = {
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
  }

  return (
    <JobContext.Provider value={sharedData}>{children}</JobContext.Provider>
  )
}

export default JobProvider
