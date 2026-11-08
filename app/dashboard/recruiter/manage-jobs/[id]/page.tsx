import { GetJobById } from "@/app/lib/actions/jobs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  Calendar,
  ChevronRight,
  Euro,
  Globe,
  Mail,
  MapPin,
  User,
  Briefcase,
} from "lucide-react"
import Link from "next/link"

interface JobDetailsTypes {
  params: Promise<{ id: string }>
}

const JobDetailsPage = async ({ params }: JobDetailsTypes) => {
  const { id } = await params
  const job = await GetJobById(id)
  console.log(job)
  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-8 font-sans text-white md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* ================= 1. Breadcrumb & Back Navigation ================= */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link
              href="/dashboard/recruiter"
              className="transition hover:text-white"
            >
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
            <Link href="/jobs" className="transition hover:text-white">
              Job Listings
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
            <span className="max-w-37.5 truncate text-gray-200 sm:max-w-xs">
              {job.title}
            </span>
          </div>

          <Link href="/dashboard/recruiter/manage-jobs">
            <Button
              variant="outline"
              className="border-gray-800 bg-[#121216] text-xs text-gray-300 hover:bg-gray-900 hover:text-white"
            >
              ← Go Back
            </Button>
          </Link>
        </div>

        {/* ================= 2. Top Hero Header Card ================= */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-xl md:p-8">
          <div className="pointer-events-none absolute top-0 right-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-indigo-600/10 blur-3xl"></div>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              {/* Category & Status */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 capitalize">
                  {job.category}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border border-gray-800 bg-[#18181b] px-3 py-1 text-xs font-medium ${
                    job.status === "Active"
                      ? "text-emerald-400"
                      : "text-gray-400"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${job.status === "Active" ? "bg-emerald-400" : "bg-gray-500"}`}
                  ></span>
                  {job.status}
                </span>
                {job.isRemote && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
                    <Globe className="h-3 w-3" /> Remote Available
                  </span>
                )}
              </div>

              {/* Job Title */}
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                {job.title}
              </h1>

              {/* Company & Location Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 md:text-sm">
                <div className="flex items-center gap-1.5 font-medium text-gray-200">
                  <Building2 className="h-4 w-4 text-indigo-400" />
                  {job.companyName}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  {job.jobType}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. Main Content Grid Layout ================= */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Responsibilities & Qualifications (Spans 2 cols) */}
          <div className="space-y-8 lg:col-span-2">
            {/* Responsibilities Section */}
            <div className="space-y-4 rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-xl md:p-8">
              <h2 className="flex items-center gap-2 text-base font-bold tracking-wider text-white uppercase">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                Key Responsibilities
              </h2>
              <Separator className="bg-gray-800/80" />
              <div className="pt-2 text-sm leading-relaxed whitespace-pre-line text-gray-300">
                {job.responsibilities}
              </div>
            </div>

            {/* Qualifications Section */}
            <div className="space-y-4 rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-xl md:p-8">
              <h2 className="flex items-center gap-2 text-base font-bold tracking-wider text-white uppercase">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                Qualifications & Requirements
              </h2>
              <Separator className="bg-gray-800/80" />
              <div className="rounded-xl border border-gray-800/60 bg-[#18181b]/50 p-4 pt-2 font-mono text-sm leading-relaxed whitespace-pre-line text-gray-300">
                {job.qualifications}
              </div>
            </div>
          </div>

          {/* Right Column: Job Overview Sidebar (Spans 1 col) */}
          <div className="space-y-6">
            {/* Overview Card */}
            <div className="space-y-6 rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-xl">
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                Job Overview
              </h3>
              <Separator className="bg-gray-800/80" />

              <div className="space-y-4 text-xs">
                {/* Compensation */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-800 bg-[#18181b] text-indigo-400">
                    <Euro className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-gray-400">Compensation / Salary</p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-200">
                      {job.minSalary} - {job.maxSalary} euro{" "}
                      <span className="text-indigo-400">/ {job.frequency}</span>
                    </p>
                  </div>
                </div>

                {/* Job Type */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-800 bg-[#18181b] text-indigo-400">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-gray-400">Employment Type</p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-200">
                      {job.jobType}
                    </p>
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-800 bg-[#18181b] text-indigo-400">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-gray-400">Application Deadline</p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-200">
                      {job.deadline}
                    </p>
                  </div>
                </div>

                {/* Location Status */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-800 bg-[#18181b] text-indigo-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-200">
                      {job.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recruiter Contact Card */}
            <div className="space-y-4 rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-xl">
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                Recruiter Contact
              </h3>
              <Separator className="bg-gray-800/80" />

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="h-4 w-4 text-indigo-400" />
                  <span className="font-medium text-white">
                    {job.recruiterName || "Random Recruiter"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="h-4 w-4 text-indigo-400" />
                  <span className="truncate">
                    {job.recruiterEmail || "abc@recruiter.com"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage
