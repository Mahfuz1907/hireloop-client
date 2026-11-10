import {
  GetApplicationsBySeeker,
  GetBookMarksBySeeker,
} from "@/app/lib/actions/application"
import { GetSessionFromServer } from "@/app/lib/GettingSessions/GetSessionFromServer"
import { ApplicationTypes } from "@/lib/types"
import { Bookmark, Send, Calendar, Award, RotateCwClock } from "lucide-react"

export default async function JobSeekerDashboard() {
  const user = await GetSessionFromServer()
  const savedJobs = await GetBookMarksBySeeker(user?.email as string)
  const appliedJobs = await GetApplicationsBySeeker(user?.email as string)
  const stats = [
    { title: "Saved Jobs", count: savedJobs.length, icon: Bookmark },
    { title: "Applications Submitted", count: appliedJobs.length, icon: Send },
    { title: "Interviews Scheduled", count: 0, icon: Calendar },
    { title: "Offers Received", count: 0, icon: Award },
  ]

  return (
    <div className="min-h-screen bg-[#09090b] p-6 text-white md:p-10">
      {/* ১. ওপরের স্ট্যাট কার্ডগুলোর সেকশন */}
      <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-lg transition hover:border-gray-700"
            >
              <div className="mb-4 flex items-center justify-between text-gray-400">
                <span className="text-sm font-medium">{stat.title}</span>
                <IconComponent className="h-5 w-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold tracking-tight">
                {stat.count}
              </div>
            </div>
          )
        })}
      </div>

      {/* ২. Recent Activity সেকশন */}
      <div className="space-y-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Recent Activity
          </h2>
          <button className="text-sm text-gray-400 transition hover:text-white">
            View All Activity
          </button>
        </div>

        {/* অ্যাক্টিভিটি লিস্ট */}
        <div className="space-y-3">
          {appliedJobs.map((act: ApplicationTypes) => {
            return (
              <div
                key={act._id}
                className="flex items-center justify-between gap-4 rounded-xl border border-gray-800/60 bg-[#121216] p-4 shadow-sm transition hover:border-gray-700/80 md:p-5"
              >
                <div className="flex items-center gap-4">
                  {/* আইকন ব্যাকগ্রাউন্ড */}
                  <div className="shrink-0 rounded-xl bg-[#1a1a22] p-2.5 text-gray-300">
                    <RotateCwClock className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-gray-300 md:text-sm">
                    {act.title}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
