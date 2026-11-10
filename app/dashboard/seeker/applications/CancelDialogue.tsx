"use client"

import { CancelApplication } from "@/app/lib/actions/application"
import { GetSessionFromClient } from "@/app/lib/GettingSessions/GetSessionFromClient"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ApplicationTypes } from "@/lib/types"
import { AlertTriangle, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const CancelDialogue = ({ appliedJob }: { appliedJob: ApplicationTypes }) => {
  const user = GetSessionFromClient()
  const router = useRouter()
  const handleCancel = async () => {
    if (user?.role !== "seeker") {
      router.push("/login")
      return
    }

    const result = await CancelApplication(appliedJob._id)
    if (result.success || result.ok || result.acknowledged) {
      toast.success("Application Canceled", { position: "top-center" })
      router.refresh()
    } else {
      toast.error("Application Cancel failed", { position: "top-center" })
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-800 bg-red-700 px-3 py-1.5 text-xs font-medium text-gray-400 transition hover:border-gray-700 hover:text-[#fff]">
        <X className="h-5 w-5" strokeWidth={3} />
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md rounded-2xl border border-gray-800 bg-[#121216] p-6 text-white shadow-2xl">
        <AlertDialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="shrink-0 rounded-xl border border-red-500/20 bg-red-500/10 p-2.5 text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <AlertDialogTitle className="text-xl font-bold tracking-tight text-white">
              Cancel Job Application of {appliedJob.title}?
            </AlertDialogTitle>
          </div>

          <AlertDialogDescription className="mt-1 text-sm leading-relaxed text-gray-400">
            Are you sure you want to cancel your application for this position?
            Once cancelled, your profile will no longer be considered for this
            role and this action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex items-center gap-3">
          <AlertDialogCancel className="m-0 rounded-xl border border-gray-700/80 bg-[#1a1a22] px-4 py-2.5 text-xs font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white">
            Keep Application
          </AlertDialogCancel>

          <AlertDialogCancel
            onClick={handleCancel}
            className="m-0 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold text-[#fff] shadow-lg transition hover:bg-red-700"
          >
            Yes, Cancel Application
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CancelDialogue
