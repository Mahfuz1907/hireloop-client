import { AddJobTypes } from "@/lib/types"

const BASE_URL = process.env.NEXT_PUBLIC_API

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

export const GetJob = async () => {
  const res = await fetch(`${BASE_URL}/jobs`)
  const result = res.json()
  return result
}
