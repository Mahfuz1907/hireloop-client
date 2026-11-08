import { GetJobById } from "@/app/lib/actions/jobs"
import EditForm from "./EditForm"

interface EditPageTypes {
  params: Promise<{ id: string }>
}

const EditJobPage = async ({ params }: EditPageTypes) => {
  const { id } = await params
  const job = await GetJobById(id)
  return <EditForm job={job} />
}

export default EditJobPage
