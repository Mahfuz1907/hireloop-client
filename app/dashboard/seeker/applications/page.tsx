import { GetApplicationsBySeeker } from "@/app/lib/actions/application"
import { GetSessionFromServer } from "@/app/lib/GettingSessions/GetSessionFromServer"
import { ApplicationTypes } from "@/lib/types"
import { Briefcase, Download, Eye } from "lucide-react"
import Link from "next/link"
import CancelDialogue from "./CancelDialogue"

export default async function MyApplicationsPage() {
  const user = await GetSessionFromServer()
  const appliedJobs = await GetApplicationsBySeeker(user?.email as string)

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "applied":
        return "bg-gray-800/60 text-gray-300 border-gray-700"
      case "review":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "shortlisted":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "offered":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      default:
        return "bg-gray-800 text-gray-300 border-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] p-6 font-sans text-white md:p-10">
      {/* ১. পেজ হেডার এবং টপ কন্ট্রোলস (Active/Archived & Export PDF) */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Applications</h1>
          <p className="mt-1 text-sm text-gray-400">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Active / Archived Toggle Pill */}
          <div className="flex items-center rounded-xl border border-gray-800 bg-[#121216] p-1">
            <button className="rounded-lg bg-[#1a1a22] px-4 py-1.5 text-xs font-medium text-white shadow-sm">
              Active
            </button>
            <button className="px-4 py-1.5 text-xs font-medium text-gray-400 transition hover:text-white">
              Archived
            </button>
          </div>

          {/* Export PDF Button */}
          <button className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black shadow-sm transition hover:bg-gray-200">
            <Download className="h-4 w-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* ২. ওপরের স্ট্যাট কার্ডগুলো (4 Cards) */}
      <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-lg">
          <span className="text-sm font-medium text-gray-400">
            Total Applied
          </span>
          <div className="mt-2 text-3xl font-bold text-white">
            {appliedJobs.length}
          </div>
        </div>
        <div className="rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-lg">
          <span className="text-sm font-medium text-gray-400">Shortlisted</span>
          <div className="mt-2 text-3xl font-bold text-white">0</div>
        </div>
        <div className="rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-lg">
          <span className="text-sm font-medium text-gray-400">Interviews</span>
          <div className="mt-2 text-3xl font-bold text-amber-500">0</div>
        </div>
        <div className="rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-lg">
          <span className="text-sm font-medium text-gray-400">
            Success Rate
          </span>
          <div className="mt-2 text-3xl font-bold text-emerald-400">0%</div>
        </div>
      </div>

      {/* ৩. অ্যাপ্লিকেশনের টেবিল বা লিস্ট সেকশন */}
      <div className="overflow-hidden rounded-2xl border border-gray-800/80 bg-[#121216] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-800 bg-[#121216]/50 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                <th className="px-6 py-4">Job Title</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm">
              {appliedJobs && appliedJobs.length > 0 ? (
                appliedJobs.map((app: ApplicationTypes) => (
                  <tr
                    key={app._id}
                    className="group transition hover:bg-[#1a1a22]/50"
                  >
                    {/* Job Title & Type */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 rounded-xl border border-gray-800 bg-[#1a1a22] p-2.5 text-gray-300">
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white transition group-hover:text-blue-400">
                            {app.title}
                          </div>
                          <div className="mt-0.5 text-xs text-gray-400">
                            {app.jobType}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Company Name */}
                    <td className="px-6 py-4 font-medium text-gray-300">
                      {app.companyName}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full border px-3 py-1 text-xs font-medium capitalize ${getStatusBadge(app.status)}`}
                      >
                        Under Review
                      </span>
                    </td>

                    {/* Action */}
                    <td className="flex flex-row items-center justify-end gap-3 px-6 py-4 text-right">
                      <CancelDialogue appliedJob={app} />

                      <Link
                        href={`/jobs/${app.jobId}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-gray-800 bg-[#1a1a22] px-3 py-1.5 text-xs font-medium text-gray-400 transition hover:border-gray-700 hover:text-white"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    No job applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
