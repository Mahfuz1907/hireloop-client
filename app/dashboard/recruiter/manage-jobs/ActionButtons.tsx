import { Button } from "@/components/ui/button"
import { Eye, Pencil } from "lucide-react"
import React from "react"
import DeleteDialogue from "./DeleteDialogue"
import { Job } from "@/lib/types"
import Link from "next/link"

const ActionButtons = ({ job }: { job: Job }) => {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <Link href={`/dashboard/recruiter/manage-jobs/${job._id}`}>
        <Button
          size="sm"
          variant="outline"
          className="h-8 cursor-pointer rounded-lg border-gray-800 bg-[#18181b] px-2.5 text-xs text-indigo-400 hover:bg-gray-800 hover:text-indigo-300"
        >
          <Eye className="h-3 w-3" />
        </Button>
      </Link>

      {/* edit icon */}
      <Link href={`/dashboard/recruiter/manage-jobs/edit-jobs/${job._id}`}>
        <Button
          variant="outline"
          className="h-8 cursor-pointer rounded-lg border-gray-800 bg-[#18181b] px-2.5 text-xs text-indigo-400 hover:bg-gray-800 hover:text-indigo-300"
        >
          <Pencil className="h-3 w-3" />
        </Button>
      </Link>

      {/* delete icon */}
      <DeleteDialogue job={job} />
    </div>
  )
}

export default ActionButtons
