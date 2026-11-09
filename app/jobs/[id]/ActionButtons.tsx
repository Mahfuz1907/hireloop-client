"use client"

import { Button } from "@/components/ui/button"
import { Bookmark, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const ActionButtons = () => {
  const [isSaved, setIsSaved] = useState(false)
  const [isApplied, setIsApplied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleApply = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsApplied(true)
      toast.success("Successfully applied for this position!", {
        position: "top-center",
      })
    }, 1000)
  }

  const handleBookmark = () => {
    setIsSaved(!isSaved)
    if (!isSaved) {
      toast.success("Job saved to your bookmarks!", { position: "top-center" })
    } else {
      toast.info("Job removed from bookmarks", { position: "top-center" })
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={handleBookmark}
        className={`h-11 w-11 rounded-xl border-gray-800 bg-[#18181b] hover:bg-gray-900 ${
          isSaved ? "border-indigo-500/50 text-indigo-400" : "text-gray-300"
        }`}
      >
        <Bookmark className={`h-4 w-4 ${isSaved ? "fill-indigo-400" : ""}`} />
      </Button>

      <Button
        onClick={handleApply}
        disabled={isApplied || isLoading}
        className={`h-11 rounded-xl px-6 text-xs font-medium shadow-lg transition ${
          isApplied
            ? "cursor-default border border-emerald-500/30 bg-emerald-600/20 text-emerald-400"
            : "bg-indigo-600 text-white shadow-indigo-600/20 hover:bg-indigo-500"
        }`}
      >
        <CheckCircle2 className="mr-1.5 inline h-4 w-4" /> Applied Successfully
        Apply For This Position
      </Button>
    </div>
  )
}

export default ActionButtons
