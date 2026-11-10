"use client"

import { useMemo } from "react"
import Link from "next/link"
import { MapPin, Briefcase, Euro, Building2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Job } from "@/lib/types"

const JobList = ({ jobs }: { jobs: Job[] }) => {
  const searchParams = useSearchParams()

  // Search + filters are combined from the URL query params
  // (search, location, jobType, category, isRemote).
  const search = (searchParams.get("search") ?? "").trim().toLowerCase()
  const location = (searchParams.get("location") ?? "").trim().toLowerCase()
  const jobType = searchParams.get("jobType") ?? ""
  const category = searchParams.get("category") ?? ""
  const isRemote = searchParams.get("isRemote")

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search) ||
        job.companyName.toLowerCase().includes(search) ||
        job.location.toLowerCase().includes(search)
      const matchesLocation =
        !location || job.location.toLowerCase().includes(location)
      const matchesJobType = !jobType || job.jobType === jobType
      const matchesCategory = !category || job.category === category
      const matchesRemote = !isRemote || job.isRemote === (isRemote === "true")

      return (
        matchesSearch &&
        matchesLocation &&
        matchesJobType &&
        matchesCategory &&
        matchesRemote
      )
    })
  }, [jobs, search, location, jobType, category, isRemote])

  return (
    <div className="space-y-6 lg:col-span-3">
      {/* Results Count & Sort Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-bold text-white">
          Found <span className="text-indigo-400">{filteredJobs.length}</span>{" "}
          Professional Jobs
        </h2>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="rounded-2xl border border-gray-800/80 bg-[#121216] p-10 text-center text-sm text-gray-400 shadow-xl">
          No jobs match your current filters. Try adjusting or resetting them.
        </div>
      ) : (
        /* Job Cards Stack (No Pagination) */
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
                      {job.isRemote ? `${job.location} (Remote)` : job.location}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default JobList
