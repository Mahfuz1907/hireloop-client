import { GetJob } from "@/app/lib/actions/jobs"
import { Button } from "@/components/ui/button"
import { Job } from "@/lib/types"
import {
  Badge,
  ChevronRight,
  Code,
  Inbox,
  Loader2,
  MapPin,
  MoreVertical,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react"
import Link from "next/link"

const ManageJobPage = async () => {
  const jobs = await GetJob()
  return (
    <div className="min-h-screen space-y-8 bg-[#09090b] p-4 font-sans text-white md:p-8">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-800/80 pb-6 md:flex-row md:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs text-gray-400">
            <Link
              href="/dashboard/recruiter"
              className="transition hover:text-white"
            >
              Manage Jobs
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
            <span className="text-gray-200">Job Listings & Postings</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Manage Job Posts
          </h1>
          <p className="mt-1 text-xs text-gray-400 md:text-sm">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Link href="/dashboard/recruiter/add-job">
          <Button className="flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500">
            <Plus className="h-4 w-4" /> New Job Post
          </Button>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="overflow-hidden rounded-2xl border border-gray-800/80 bg-[#121216] shadow-xl">
        {jobs.length === 0 ? (
          /* 🔴 Empty State (Jokhon database-e kono job thakbe na) */
          <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-500">
              <Inbox className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-gray-200">
              No Job Posts Found
            </h3>
            <p className="mt-1 mb-6 max-w-sm text-xs text-gray-400">
              You haven&apos;t created any job listings yet. Click the button
              below to post your first job opening.
            </p>
            <Link href="/dashboard/recruiter/add-job">
              <Button className="rounded-xl bg-indigo-600 px-4 py-2 text-xs text-white hover:bg-indigo-500">
                <Plus className="mr-1.5 h-4 w-4" /> Create Job Listing
              </Button>
            </Link>
          </div>
        ) : (
          /* 🟢 Data Table (Jokhon jobs thakbe) */
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-800/80 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                  <th className="px-6 py-4">Job Title & Dept</th>
                  <th className="px-6 py-4">Company & Location</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Compensation</th>
                  <th className="px-6 py-4">Applicants</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Deadline</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40 text-sm">
                {jobs.map((job: Job) => (
                  <tr key={job._id} className="transition hover:bg-gray-900/40">
                    {/* Job Title & Dept */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-800 bg-[#18181b] text-indigo-400">
                          <Code className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-200">
                            {job.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-indigo-400">
                            {job.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Company & Location */}
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-gray-200">
                        {job.companyName}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-400">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        {job.isRemote
                          ? `Remote (${job.location})`
                          : job.location}
                      </p>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4">
                      <Badge className="rounded-full border border-gray-800 bg-[#18181b] px-2.5 py-0.5 text-xs font-normal text-gray-300">
                        {job.jobType}
                      </Badge>
                    </td>

                    {/* Compensation */}
                    <td className="px-6 py-4 text-xs font-semibold text-gray-200">
                      {job.minSalary}-{job.maxSalary}
                    </td>

                    {/* Status */}
                    {/* Applicants */}
                    <td className="px-6 py-4">
                      {/* <span className="flex items-center gap-1.5 text-xs font-medium text-gray-300">
                        <Users className="h-3.5 w-3.5 text-gray-400" />
                        {job.applicantsCount} Candidates
                      </span> */}
                    </td>
                    <td className="px-6 py-4">
                      {/* <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          job.status === "Active"
                            ? "text-emerald-400"
                            : "text-gray-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            job.status === "Active"
                              ? "bg-emerald-400"
                              : "bg-gray-500"
                          }`}
                        ></span>
                        {job.status}
                      </span> */}
                    </td>

                    {/* Deadline */}
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-gray-200">
                        {job.deadline}
                      </p>
                      <p className="mt-0.5 text-[11px] text-gray-500">
                        {job.deadline}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 cursor-pointer rounded-lg border-gray-800 bg-[#18181b] px-2.5 text-xs text-indigo-400 hover:bg-gray-800 hover:text-indigo-300"
                        >
                          <Pencil className="mr-1 h-3 w-3" /> Update
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 cursor-pointer rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 cursor-pointer rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageJobPage
