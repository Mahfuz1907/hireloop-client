import { Plus, ChevronDown } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GetAllJobs } from "@/app/lib/actions/jobs"
import { Job } from "@/lib/types"

export default async function AdminJobManagementPage() {
  const jobs = await GetAllJobs()

  return (
    <div className="min-h-screen bg-[#09090b] p-4 font-sans text-white sm:p-6 md:p-10">
      {/* ১. পেজ হেডার এবং ক্রিয়েট জব বাটন */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Jobs</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Oversee all active listings and historical job posts across the
            platform.
          </p>
        </div>

        <Button className="h-10 w-fit rounded-xl bg-white px-4 text-xs font-semibold text-black shadow-sm transition hover:bg-zinc-200">
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>
      </div>

      {/* ২. ফিল্টার এবং ট্যাব সেকশন */}
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        {/* ড্রপডাউন ফিল্টারস */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                className="h-10 min-w-35 justify-between rounded-xl border-zinc-800 bg-[#121216] px-4 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
              >
                All Statuses{" "}
                <ChevronDown className="ml-2 h-4 w-4 text-zinc-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-zinc-800 bg-[#121216] text-zinc-300">
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
                Active
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
                Closed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Category Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                className="h-10 min-w-37.5 justify-between rounded-xl border-zinc-800 bg-[#121216] px-4 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
              >
                All Categories{" "}
                <ChevronDown className="ml-2 h-4 w-4 text-zinc-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-zinc-800 bg-[#121216] text-zinc-300">
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
                All Categories
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
                Design
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
                Engineering
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
                Marketing
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* ট্যাব পিলস (Active / Closed) */}
        <div className="flex w-fit items-center rounded-xl border border-zinc-800 bg-[#121216] p-1">
          <Button
            variant="ghost"
            className="h-8 rounded-lg bg-[#1a1a22] px-4 text-xs font-medium text-white shadow-sm hover:bg-[#1a1a22] hover:text-white"
          >
            Active (128)
          </Button>
          <Button
            variant="ghost"
            className="h-8 rounded-lg px-4 text-xs font-medium text-zinc-400 transition hover:bg-transparent hover:text-white"
          >
            Closed (45)
          </Button>
        </div>
      </div>

      {/* ৩. জব ম্যানেজমেন্ট টেবিল (Shadcn Table) */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#121216] shadow-xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-zinc-800 bg-[#121216]/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                  Title
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                  Company
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                  Category
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                  Type
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-zinc-800/60 text-sm">
              {jobs && jobs.length > 0 ? (
                jobs.map((job: Job) => (
                  <TableRow
                    key={job._id}
                    className="group border-zinc-800/60 transition hover:bg-zinc-900/50"
                  >
                    {/* Title & Ref */}
                    <TableCell className="px-6 py-4">
                      <div className="font-semibold text-white transition group-hover:text-blue-400">
                        {job.title}
                      </div>
                    </TableCell>

                    {/* Company */}
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-zinc-200">
                          {job.companyName}
                        </span>
                      </div>
                    </TableCell>

                    {/* Category Badge */}
                    <TableCell className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className="rounded-lg border-zinc-800 bg-[#18181b] px-3 py-1 text-xs font-normal text-zinc-300"
                      >
                        {job.category}
                      </Badge>
                    </TableCell>

                    {/* Job Type */}
                    <TableCell className="px-6 py-4 text-xs font-medium text-zinc-400">
                      {job.jobType}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell className="px-6 py-4">
                      {job.status === "Active" ? (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-700/80 bg-zinc-800/60 px-3 py-1 text-xs font-medium text-zinc-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-500"></span>
                          Closed
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-12 text-center text-zinc-500"
                  >
                    No jobs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
