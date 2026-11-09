"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Bookmark, Briefcase, Euro, Building2 } from "lucide-react"
import Link from "next/link"
import SearchBar from "./SearchBar"
import FilterSideBar from "./FilterSideBar"
import { GetJob, GetJobPerPage } from "../lib/actions/jobs"
import { Job } from "@/lib/types"
import PaginationComponent from "./PaginationComponent"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { JobContext } from "@/Context/JobContext"

const Jobs = () => {
  const router = useRouter()
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit] = useState(10)
  const [allJobs, setAllJobs] = useState([])
  const [jobsLength, setJobsLength] = useState(0)

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setPageNumber(newPage)
    router.push(`/jobs?page=${newPage}`)
  }

  useEffect(() => {
    const fetchjobs = async () => {
      const jobs = await GetJob()
      const jobsPerPage = await GetJobPerPage(pageNumber, limit)
      setAllJobs(jobsPerPage.jobs)
      setJobsLength(jobs.length)
      setTotalPages(jobsPerPage.totalPages)
    }

    fetchjobs()
  }, [pageNumber, limit])

  const { searchQuery, filter } = useContext(JobContext)
  const filteredJobs = allJobs.filter((job: Job) => {
    const matchesSearch = searchQuery
      ? job.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    const matchesFilter =
      filter.length > 0 ? filter.includes(job.jobType) : true

    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen space-y-8 bg-[#09090b] px-4 py-8 font-sans text-white md:px-8 lg:px-12">
      {/* ================= 1. Top Search Bar Section ================= */}
      <SearchBar />

      {/* ================= 2. Main Layout (Sidebar Filters + Job Listings) ================= */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Left Column: Filters Sidebar */}
        <FilterSideBar />

        {/* Right Column: Job Cards List */}
        <div className="space-y-6 lg:col-span-3">
          {/* Results Count & Sort Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-bold text-white">
              Found <span className="text-indigo-400">{jobsLength}</span>{" "}
              Professional Jobs
            </h2>
          </div>

          {/* Job Cards Stack (No Pagination) */}
          <div className="space-y-4">
            {filteredJobs.map((job: Job) => (
              <div
                key={job._id}
                className="group relative overflow-hidden rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-xl transition hover:border-indigo-500/50 hover:bg-[#15151a]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Left Info (Icon, Title, Company) */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-800 bg-[#18181b] text-indigo-400 shadow-inner">
                      <Building2 className="h-6 w-6" />
                    </div>

                    <div className="space-y-1">
                      <Link href={`/jobs/${job._id}`}>
                        <h3 className="text-base font-bold text-white transition group-hover:text-indigo-400">
                          {job.title}
                        </h3>
                      </Link>
                      <p className="flex items-center gap-1.5 text-xs text-gray-400">
                        <span className="font-medium text-gray-200">
                          {job.companyName}
                        </span>
                        <span>•</span>
                        <MapPin className="h-3 w-3 text-gray-500" />
                        {job.isRemote
                          ? `${job.location} (Remote)`
                          : job.location}
                      </p>

                      {/* Small Badges / Tags inside card */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {/* Salary Badge */}
                        <span className="inline-flex items-center gap-1 rounded-lg border border-gray-800 bg-[#18181b] px-2.5 py-1 text-[11px] font-medium text-gray-300">
                          <Euro className="h-3 w-3 text-indigo-400" />
                          {job.minSalary} - {job.maxSalary} /{job.frequency}
                        </span>

                        {/* Job Type Badge */}
                        <span className="inline-flex items-center gap-1 rounded-lg border border-gray-800 bg-[#18181b] px-2.5 py-1 text-[11px] font-medium text-gray-400">
                          <Briefcase className="h-3 w-3 text-gray-500" />
                          {job.jobType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Action (Bookmark button) */}
                  <div className="flex items-center justify-end sm:justify-start">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-xl border-gray-800 bg-[#18181b] text-gray-400 hover:bg-gray-900 hover:text-white"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* pagination */}
          <PaginationComponent
            pageNumber={pageNumber}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Jobs
