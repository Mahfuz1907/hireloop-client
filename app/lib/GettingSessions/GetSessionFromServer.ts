"use server"

import { auth } from "@/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const GetSessionFromServer = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return session?.user
}

export const GetToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session?.session?.token) {
    redirect("/unauthorized")
  }

  return session?.session?.token
}

export const authFetch = async (api: string) => {
  const token = await GetToken()
  const res = await fetch(api, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return res.json()
}

export const requireRole = async (role: string) => {
  const user = await GetSessionFromServer()

  if (!user || user?.role !== role) {
    redirect("/unauthorized")
  }

  return user
}
