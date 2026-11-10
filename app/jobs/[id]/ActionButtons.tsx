"use client"

import {
  AddApplication,
  AddBookMark,
  DeleteBookMark,
} from "@/app/lib/actions/application"
import { GetSessionFromClient } from "@/app/lib/GettingSessions/GetSessionFromClient"
import { Button } from "@/components/ui/button"
import { ApplicationTypes, BookMarkTypes, Job } from "@/lib/types"
import { AppWindow, Bookmark, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ActionTypes {
  job: Job
  bookmarkPerSeeker: BookMarkTypes[]
  applicationPerSeeker: ApplicationTypes[]
}

const ActionButtons = ({
  job,
  bookmarkPerSeeker,
  applicationPerSeeker,
}: ActionTypes) => {
  const user = GetSessionFromClient()
  const router = useRouter()
  const isBookMarked = bookmarkPerSeeker.some((book) => book.jobId === job._id)
  const isApplied = applicationPerSeeker.some((app) => app.jobId === job._id)

  const handleApply = async () => {
    if (user?.role !== "seeker") {
      router.push("/login")
      return
    }

    const appliedOne = applicationPerSeeker.find((app) => app.jobId === job._id)
    if (isApplied) {
      toast.error(`${appliedOne?.title} is already applied`, {
        position: "top-center",
      })
      return
    } else {
      const { _id, ...jobDetails } = job
      const appliedData = {
        ...jobDetails,
        jobId: _id,
        jobSeekerName: user?.name,
        jobSeekerEmail: user?.email,
      }

      const result = await AddApplication(appliedData)

      if (result.ok || result.acknowledged || result.success) {
        router.refresh()
        toast.success(`Application to ${appliedData.title} is successfull`, {
          position: "top-center",
        })
      } else {
        toast.error("Application failed", { position: "top-center" })
      }
    }
  }

  // handle bookmark
  const handleBookmark = async () => {
    if (user?.role !== "seeker") {
      router.push("/login")
      return
    }
    const bookedOne = bookmarkPerSeeker.find((book) => book.jobId === job._id)
    if (isBookMarked) {
      const result = await DeleteBookMark(bookedOne?._id as string)
      console.log(result)

      if (result.ok || result.acknowledged || result.success) {
        router.refresh()
        toast.success(`${bookedOne?.title} is removed from bookmark`, {
          position: "top-center",
        })
      } else {
        toast.error("Failed to remove from bookmark", {
          position: "top-center",
        })
      }
    } else {
      const { _id, ...jobDetails } = job
      const bookMarkData = {
        ...jobDetails,
        jobId: _id,
        jobSeekerName: user?.name,
        jobSeekerEmail: user?.email,
      }

      const result = await AddBookMark(bookMarkData)

      if (result.ok || result.acknowledged || result.success) {
        router.refresh()
        toast.success(`${bookMarkData.title} is added to bookmark`, {
          position: "top-center",
        })
      } else {
        toast.error("Failed to add to bookmark", { position: "top-center" })
      }
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={handleBookmark}
        className={`h-11 w-11 rounded-xl border-gray-800 bg-[#18181b] hover:bg-gray-900 ${
          isBookMarked
            ? "border-indigo-500/50 text-indigo-400"
            : "text-gray-300"
        }`}
      >
        <Bookmark
          className={`h-4 w-4 ${isBookMarked ? "fill-indigo-400" : ""}`}
        />
      </Button>

      <Button
        onClick={handleApply}
        className={`h-11 rounded-xl px-6 text-xs font-medium shadow-lg transition ${
          isApplied
            ? "cursor-default border border-emerald-500/30 bg-emerald-600/20 text-emerald-400"
            : "bg-indigo-600 text-[#fff] shadow-indigo-600/20 hover:bg-indigo-500"
        }`}
      >
        {isApplied ? (
          <CheckCircle2 className="mr-1.5 inline h-4 w-4" />
        ) : (
          <AppWindow className="mr-1.5 inline h-4 w-4" />
        )}
        {isApplied ? "Applied For This Position" : "Apply For This Position"}
      </Button>
    </div>
  )
}

export default ActionButtons
