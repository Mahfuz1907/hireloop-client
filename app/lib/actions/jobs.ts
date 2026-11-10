import { AddJobTypes } from "@/lib/types"

const BASE_URL = process.env.NEXT_PUBLIC_API

// ------------------------------------------------------Add Job----------------------------------------------------
export const AddJob = async (data: AddJobTypes) => {
  const res = await fetch(`${BASE_URL}/add-job`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()
  return result
}

// -------------------------------------------------------Get Jobs By Query----------------------------------------------------------------
export const GetJobByQuery = async (query = "") => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`)
  const result = res.json()
  return result
}

// -----------------------------------------------------Get all jobs----------------------------------------------------------
export const GetAllJobs = async () => {
  const res = await fetch(`${BASE_URL}/all-jobs`)
  const result = await res.json()
  return result
}

// -------------------------------------------------------------Get Job by Id------------------------------------------------------
export const GetJobById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`)
  const result = res.json()
  return result
}

// --------------------------------------------------------------Get Job by recruiter----------------------------------------------
export const GetJobByRecruiter = async (email: string) => {
  const res = await fetch(`${BASE_URL}/jobs/recruiter/${email}`)
  const result = res.json()
  return result
}

// ------------------------------------------------------------Delete Job by id-------------------------------------------------------
export const DeleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/delete/${id}`, {
    method: "DELETE",
  })
  const result = res.json()
  return result
}

// ----------------------------------------------------------------Edit job by id-------------------------------------------------------
export const EditJob = async (id: string, data: AddJobTypes) => {
  const res = await fetch(`${BASE_URL}/jobs/edit/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}
