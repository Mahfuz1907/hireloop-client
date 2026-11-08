"use client"

import { Building2, Calendar, Euro, MapPin } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useSession } from "@/app/lib/auth-client"
import { useState } from "react"
import { AddJobTypes, Job } from "@/lib/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { EditJob } from "@/app/lib/actions/jobs"

const EditForm = ({ job }: { job: Job }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const userName = session?.user?.name
  const userEmail = session?.user?.email
  const [formData, setFormData] = useState<AddJobTypes>({
    title: job.title,
    companyName: job.companyName,
    category: job.category,
    jobType: job.jobType,
    isRemote: job.isRemote,
    location: job.location,
    deadline: job.deadline,
    minSalary: job.minSalary,
    maxSalary: job.maxSalary,
    frequency: job.frequency,
    status: job.status,
    responsibilities: job.responsibilities,
    qualifications: job.qualifications,
    recruiterName: "",
    recruiterEmail: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const jobData = {
      ...formData,
      status: "Active",
      recruiterName: userName,
      recruiterEmail: userEmail,
    }

    console.log(jobData)

    const result = await EditJob(job._id, jobData)

    if (result.acknowledged || result.ok || result.success) {
      toast.success("Job Edited successfully", { position: "top-center" })
      router.push("/dashboard/recruiter/manage-jobs")
    } else {
      toast.error("Job edit failed", { position: "top-center" })
    }
  }
  return (
    <div className="min-h-screen bg-[#09090b] p-4 font-sans text-white md:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Top Breadcrumb & Header Bar */}
          <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-800/80 pb-6 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                {/* Edit {job.title} */}
                Update Job
              </h1>
            </div>
          </div>
          <div className="space-y-10">
            {/* ================= SECTION 1: Basic Information ================= */}
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-indigo-400 uppercase">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span> 1.
                Basic Information
              </h2>

              {/* Job Title */}
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="text-xs font-medium text-gray-300"
                >
                  Job Title <span className="text-red-500">*</span>
                </label>
                <Input
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  defaultValue={job.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  className="h-12 rounded-xl border-gray-800 bg-[#121216] text-sm text-white focus-visible:ring-indigo-500"
                />
              </div>

              {/* Company Name & Job Category */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="companyName"
                    className="text-xs font-medium text-gray-300"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="companyName"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. HirePulse Network"
                      className="h-12 rounded-xl border-gray-800 bg-[#121216] pl-10 text-sm text-white focus-visible:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300">
                    Job Category <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value || "" })
                    }
                  >
                    <SelectTrigger className="h-12 rounded-xl border-gray-800 bg-[#121216] text-sm text-white focus:ring-indigo-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-800 bg-[#121216] text-white">
                      <SelectItem value="engineering">
                        Engineering & Tech
                      </SelectItem>
                      <SelectItem value="design">Product & Design</SelectItem>
                      <SelectItem value="marketing">
                        Marketing & Growth
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Job Type Selector Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-300">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 rounded-xl border border-gray-800 bg-[#121216] p-1.5 sm:grid-cols-4">
                  {["Full-time", "Part-time", "Contract", "Internship"].map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            jobType: type,
                          }))
                        }
                        className={`cursor-pointer rounded-lg py-2 text-xs font-medium transition ${
                          formData.jobType === type
                            ? "border border-indigo-500/30 bg-[#1d1b33] text-indigo-400 shadow"
                            : "text-gray-400 hover:bg-[#18181b] hover:text-white"
                        }`}
                      >
                        {type}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* ================= SECTION 2: Location, Compensation & Timeline ================= */}
            <div className="space-y-6 border-t border-gray-800/60 pt-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-indigo-400 uppercase">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span> 2.
                Location, Compensation & Timeline
              </h2>

              {/* Remote Work Switch Card */}
              <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-[#121216] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-[#18181b] text-indigo-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-200">
                      Remote Work Allowed (isRemote)
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Enable worldwide or distributed candidate applications
                    </p>
                  </div>
                </div>
                <Switch
                  checked={formData.isRemote}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isRemote: checked }))
                  }
                  className="data-[state=checked]:bg-indigo-600"
                />
              </div>

              {/* Location & Deadline */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="location"
                      className="text-xs font-medium text-gray-300"
                    >
                      Job Location (location)
                    </label>
                    <span className="rounded border border-gray-800 bg-gray-900 px-2 py-0.5 text-[10px] text-gray-500">
                      Required
                    </span>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. New York, USA"
                      className="h-12 rounded-xl border-gray-800 bg-[#121216] pl-10 text-sm text-white focus-visible:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="deadline"
                    className="text-xs font-medium text-gray-300"
                  >
                    Application Deadline (deadline)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-gray-800 bg-[#121216] pl-10 text-sm text-white focus-visible:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Salary & Frequency */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label
                    htmlFor="minSalary"
                    className="text-xs font-medium text-gray-300"
                  >
                    Min Salary / Rate
                  </label>
                  <div className="relative">
                    <Euro className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="minSalary"
                      name="minSalary"
                      type="number"
                      value={formData.minSalary}
                      onChange={handleChange}
                      placeholder="25"
                      className="h-12 rounded-xl border-gray-800 bg-[#121216] pl-10 text-sm text-white focus-visible:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="maxSalary"
                    className="text-xs font-medium text-gray-300"
                  >
                    Max Salary / Rate
                  </label>
                  <div className="relative">
                    <Euro className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="maxSalary"
                      name="maxSalary"
                      type="number"
                      value={formData.maxSalary}
                      onChange={handleChange}
                      placeholder="40"
                      className="h-12 rounded-xl border-gray-800 bg-[#121216] pl-10 text-sm text-white focus-visible:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300">
                    Frequency
                  </label>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) =>
                      setFormData({ ...formData, frequency: value || "" })
                    }
                  >
                    <SelectTrigger className="h-12 rounded-xl border-gray-800 bg-[#121216] text-sm text-white focus:ring-indigo-500">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-800 bg-[#121216] text-white">
                      <SelectItem value="hourly">per hour</SelectItem>
                      <SelectItem value="monthly">per month</SelectItem>
                      <SelectItem value="yearly">per year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* ================= SECTION 3: Responsibilities & Requirements ================= */}
            <div className="space-y-6 border-t border-gray-800/60 pt-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-indigo-400 uppercase">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span> 3.
                Responsibilities & Requirements
              </h2>

              {/* Key Responsibilities */}
              <div className="space-y-2">
                <label
                  htmlFor="responsibilities"
                  className="text-xs font-medium text-gray-300"
                >
                  Key Responsibilities <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  required
                  value={formData.responsibilities}
                  onChange={handleChange}
                  placeholder="Describe key responsibilities..."
                  className="min-h-25 resize-none rounded-xl border-gray-800 bg-[#121216] p-4 text-sm text-white focus-visible:ring-indigo-500"
                />
              </div>

              {/* Qualifications & Requirements */}
              <div className="space-y-2">
                <label
                  htmlFor="qualifications"
                  className="text-xs font-medium text-gray-300"
                >
                  Qualifications & Requirements{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="qualifications"
                  name="qualifications"
                  required
                  value={formData.qualifications}
                  onChange={handleChange}
                  placeholder="List down required qualifications..."
                  className="min-h-27.5 resize-none rounded-xl border-gray-800 bg-[#121216] p-4 font-mono text-xs text-white focus-visible:ring-indigo-500"
                />
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-800 pt-6">
              <Link href={"/dashboard/recruiter/manage-jobs"}>
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-800 bg-transparent text-xs text-gray-300 hover:bg-gray-900"
                >
                  Go Back
                </Button>
              </Link>
              <Button
                type="submit"

                className="cursor-pointer rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
              >
                Update Job Listing
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditForm
