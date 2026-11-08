"use client"

import { DeleteJob } from "@/app/lib/actions/jobs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Job } from "@/lib/types"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const DeleteDialogue = ({ job }: { job: Job }) => {
  const router = useRouter()
  const handleDelete = async () => {
    const result = await DeleteJob(job._id)

    if (result.success || result.ok || result.acknowledged) {
      toast.success(`${job.title} is deleted successfully`, {
        position: "top-center",
      })
      router.refresh()
    } else {
      toast.error("Job deletion failed")
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            size="icon"
            variant="destructive"
            className="h-8 w-8 cursor-pointer rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={"text-red-400"}>
            Are you confirm to delete {job.title}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this job
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            className="cursor-pointer rounded-lg text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialogue
