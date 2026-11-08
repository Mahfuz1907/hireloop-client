import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import React from "react"
import DeleteDialogue from "./DeleteDialogue"
import { Job } from "@/lib/types"
import EditDialogue from "./EditDialogue"

const ActionButtons = ({ job }: { job: Job }) => {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <Button
        size="sm"
        variant="outline"
        className="h-8 cursor-pointer rounded-lg border-gray-800 bg-[#18181b] px-2.5 text-xs text-indigo-400 hover:bg-gray-800 hover:text-indigo-300"
      >
        <Eye className="h-3 w-3" />
      </Button>
      {/* edit icon */}
      <EditDialogue />

      {/* delete icon */}
      <DeleteDialogue job={job} />
    </div>
  )
}

export default ActionButtons
