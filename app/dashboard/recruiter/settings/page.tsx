"use client"

import { useState } from "react"
import { updateUser, useSession } from "@/app/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { ChevronRight, Mail, User, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const RecruiterSettingsPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const userName = session?.user?.name || ""
  const userEmail = session?.user?.email || ""

  const [name, setName] = useState(userName)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userData = Object.fromEntries(formData) as Record<string, string>

    const { data } = await updateUser({
      name: userData.name,
    })

    if (data) {
      toast.success(
        `Recruiter name is updated to ${userData.name} successfully`,
        {
          position: "top-center",
        }
      )
      router.refresh()
    } else {
      toast.error("Name update failed", { position: "top-center" })
    }
  }

  return (
    <div className="min-h-screen space-y-8 bg-[#09090b] p-4 font-sans text-white md:p-8 lg:px-12">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* ================= 1. Top Header & Breadcrumb ================= */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-800/80 pb-6 md:flex-row md:items-center">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs text-gray-400">
              <Link
                href="/dashboard/recruiter"
                className="transition hover:text-white"
              >
                Dashboard
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
              <span className="text-gray-200">Settings</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Recruiter Settings
            </h1>
            <p className="mt-1 text-xs text-gray-400 md:text-sm">
              Manage your recruiter profile information and account credentials.
            </p>
          </div>
        </div>

        {/* ================= 2. Profile Settings Card ================= */}
        <div className="space-y-6 rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-xl md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Personal Information
              </h2>
              <p className="text-xs text-gray-400">
                Update your public profile details
              </p>
            </div>
          </div>

          <Separator className="bg-gray-800/80" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Full Name (Editable) */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-gray-300"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 rounded-xl border-gray-800 bg-[#18181b] pl-10 text-sm text-white focus-visible:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Email Address (Read-Only / Disabled) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-gray-300"
                  >
                    Email Address
                  </label>
                  <span className="rounded border border-gray-800 bg-gray-900 px-2 py-0.5 text-[10px] text-gray-500">
                    Read-only
                  </span>
                </div>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-600" />
                  <Input
                    id="email"
                    disabled
                    value={userEmail}
                    className="h-12 cursor-not-allowed rounded-xl border-gray-800 bg-[#18181b]/50 pl-10 text-sm text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Role Badge Info Box */}
            <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-[#18181b]/60 p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="text-xs font-medium text-gray-200">
                    Account Role
                  </p>
                  <p className="text-[11px] text-gray-400">
                    You are logged in as a verified Recruiter
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                Recruiter
              </span>
            </div>

            {/* Submit Button Footer */}
            <div className="flex justify-end border-t border-gray-800/80 pt-4">
              <Button
                type="submit"
                className="cursor-pointer rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-medium text-[#fff] shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RecruiterSettingsPage
