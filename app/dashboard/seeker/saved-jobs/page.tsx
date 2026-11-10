import { GetBookMarksBySeeker } from "@/app/lib/actions/application"
import { GetSessionFromServer } from "@/app/lib/GettingSessions/GetSessionFromServer"
import { ApplicationTypes } from "@/lib/types"
import { Bookmark, Building, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function SavedJobsPage() {
  const user = await GetSessionFromServer()
  const savedJobs = await GetBookMarksBySeeker(user?.email as string)

  return (
    <div className="min-h-screen bg-[#09090b] p-6 text-white md:p-10">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Saved Jobs</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage and view all your bookmarked job opportunities in one place.
          </p>
        </div>
        <div className="w-fit rounded-xl border border-gray-800 bg-[#121216] px-4 py-2.5 text-sm font-medium text-gray-300 shadow-sm">
          Total Bookmarked:{" "}
          <span className="font-bold text-white">{savedJobs.length}</span>
        </div>
      </div>

      {/* যদি savedJobs এ ডেটা থাকে */}
      {savedJobs && savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((job: ApplicationTypes) => (
            <div
              key={job._id}
              className="group flex flex-col justify-between rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-lg transition hover:border-gray-700"
            >
              <div>
                {/* টপ সেকশন: জব টাইটেল এবং বুকমার্ক আইকন */}
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white transition group-hover:text-blue-400">
                    {job.title}
                  </h3>
                </div>

                {/* কোম্পানির নাম */}
                <p className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Building className="h-4 w-4 text-gray-500" />{" "}
                  {job.companyName}
                </p>

                {/* লোকেশন এবং জব টাইপ */}
                <div className="mb-6 space-y-2 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="rounded-lg border border-gray-800 bg-[#1a1a22] px-2.5 py-1 font-medium text-gray-300">
                      {job.jobType}
                    </span>
                    {job.minSalary && (
                      <span className="font-medium text-gray-400">
                        ${job.minSalary}k - ${job.maxSalary}k / {job.frequency}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* ফুটার: ডিটেইলস লিংক এবং এপ্লাই বাটন */}
              <div className="mt-auto flex items-center justify-between border-t border-gray-800/60 pt-4">
                <Link
                  href={`/jobs/${job.jobId}`}
                  className="flex w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-xl bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                  View Details <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* যদি কোনো সেভ করা জব না থাকে (Empty State) */
        <div className="rounded-2xl border border-gray-800 bg-[#121216] py-20 text-center">
          <Bookmark className="mx-auto mb-4 h-12 w-12 text-gray-600" />
          <h3 className="text-lg font-medium text-white">No saved jobs yet</h3>
          <p className="mt-1 text-sm text-gray-400">
            Jobs you bookmark while exploring will appear right here.
          </p>
        </div>
      )}
    </div>
  )
}
