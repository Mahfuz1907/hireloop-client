import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Zap, CheckCircle2, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { GetJob } from "@/app/lib/actions/jobs"

const mockApplications = [
  {
    id: "1",
    name: "Julianne Moore",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    role: "Senior Product Designer",
    dateApplied: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    id: "2",
    name: "Robert Downey",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    role: "Backend Engineer",
    dateApplied: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
  },
  {
    id: "3",
    name: "Emma Stone",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    role: "Marketing Lead",
    dateApplied: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    id: "4",
    name: "Chris Pratt",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    role: "Product Manager",
    dateApplied: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
  },
]

const RecruiterDashboardPage = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API}/jobs`)
  // const jobs = await res.json()
  const jobs = await GetJob()
  return (
    <div className="min-h-screen space-y-8 bg-[#09090b] p-4 font-sans text-white md:p-8">
      {/* Welcome Banner Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Welcome back, Alex Sterling
        </h1>
      </div>

      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-800/80 bg-[#121216] text-white shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-[#18181b] text-gray-400">
              <FileText className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-medium text-gray-400">Total Job Posts</p>
            <h3 className="mt-1 text-2xl font-bold text-white">
              {jobs.length}
            </h3>
          </CardContent>
        </Card>

        <Card className="border-gray-800/80 bg-[#121216] text-white shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-[#18181b] text-gray-400">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-medium text-gray-400">
              Total Applicants
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">1,284</h3>
          </CardContent>
        </Card>

        <Card className="border-gray-800/80 bg-[#121216] text-white shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-[#18181b] text-gray-400">
              <Zap className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-medium text-gray-400">Active Jobs</p>
            <h3 className="mt-1 text-2xl font-bold text-white">18</h3>
          </CardContent>
        </Card>

        <Card className="border-gray-800/80 bg-[#121216] text-white shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-[#18181b] text-gray-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-medium text-gray-400">Jobs Closed</p>
            <h3 className="mt-1 text-2xl font-bold text-white">32</h3>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications Table Section */}
      <div className="space-y-4 rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Applications</h2>
          <span className="flex cursor-pointer items-center gap-1 text-xs font-medium text-gray-400 transition hover:text-white">
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-800/80 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                <th className="px-4 py-3">Candidate Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Date Applied</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40 text-sm">
              {mockApplications.map((item) => (
                <tr key={item.id} className="transition hover:bg-gray-900/40">
                  <td className="flex items-center gap-3 px-4 py-3.5">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-700">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-200">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-400">
                    {item.role}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-400">
                    {item.dateApplied}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-400">
                    {item.experience}
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge
                      variant="outline"
                      className={`rounded-full border-0 px-3 py-1 text-[11px] font-medium ${
                        item.status === "Interviewing"
                          ? "bg-[#252342] text-[#818cf8]"
                          : item.status === "New"
                            ? "bg-[#1d2b45] text-[#60a5fa]"
                            : item.status === "Reviewing"
                              ? "bg-[#382b19] text-[#fbbf24]"
                              : "bg-[#361a1d] text-[#f87171]"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RecruiterDashboardPage
