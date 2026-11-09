"use client"

import { AddBookMark, DeleteBookMark } from "@/app/lib/actions/application"
import { GetSessionFromClient } from "@/app/lib/GettingSessions/GetSessionFromClient"
import { Button } from "@/components/ui/button"
import { BookMarkTypes, Job } from "@/lib/types"
import { AppWindow, Bookmark, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ActionTypes {
  job: Job
  bookmarkPerSeeker: BookMarkTypes[]
}

const ActionButtons = ({ job, bookmarkPerSeeker }: ActionTypes) => {
  const user = GetSessionFromClient()
  const router = useRouter()
  const isBookMarked = bookmarkPerSeeker.some((book) => book.jobId === job._id)

  const handleApply = () => {}

  const handleBookmark = async () => {
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
        // className={`h-11 rounded-xl px-6 text-xs font-medium shadow-lg transition ${
        //   isApplied
        //     ? "cursor-default border border-emerald-500/30 bg-emerald-600/20 text-emerald-400"
        //     : "bg-indigo-600 text-white shadow-indigo-600/20 hover:bg-indigo-500"
        // }`}
      >
        {/* <CheckCircle2 className="mr-1.5 inline h-4 w-4" /> */}
        <AppWindow className="mr-1.5 inline h-4 w-4" />
        Apply For This Position
      </Button>
    </div>
  )
}

export default ActionButtons
