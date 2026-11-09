import { AddBookMarkTypes } from "@/lib/types"

const BASE_URL = process.env.NEXT_PUBLIC_API

// ---------------------------------------------------Adding bookmark-------------------------------------------------
export const AddBookMark = async (data: AddBookMarkTypes) => {
  const res = await fetch(`${BASE_URL}/add-bookmark`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()

  return result
}

// -------------------------------------------------------Getting bookmarks by job seeker email------------------------------------------
export const GetBookMarksBySeeker = async (email: string) => {
  const res = await fetch(`${BASE_URL}/bookmarks/seeker/${email}`)
  const result = await res.json()
  return result
}

// -------------------------------------------------------Deleting bookmarks by id------------------------------------------
export const DeleteBookMark = async (id: string) => {
  const res = await fetch(`${BASE_URL}/bookmarks/delete/${id}`, {
    method: "DELETE",
  })
  const result = await res.json()
  return result
}
