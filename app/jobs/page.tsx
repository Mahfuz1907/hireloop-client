import { Suspense } from "react"
import { connection } from "next/server"
import SearchBar from "./SearchBar"
import FilterSideBar from "./FilterSideBar"
import JobList from "./JobList"
import { GetJobByQuery } from "../lib/actions/jobs"

const Jobs = async () => {
  // Render per request so newly posted jobs are always fresh.
  await connection()
  const jobs = await GetJobByQuery()

  return (
    <div className="min-h-screen space-y-8 bg-[#09090b] px-4 py-8 font-sans text-white md:px-8 lg:px-12">
      {/* ================= 1. Top Search Bar Section ================= */}
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>

      {/* ================= 2. Main Layout (Sidebar Filters + Job Listings) ================= */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Left Column: Filters Sidebar */}
        <Suspense fallback={null}>
          <FilterSideBar />
        </Suspense>

        {/* Right Column: Job Cards List (search + filters combined from URL query) */}
        <Suspense fallback={null}>
          <JobList jobs={jobs} />
        </Suspense>
      </div>
    </div>
  )
}

export default Jobs
