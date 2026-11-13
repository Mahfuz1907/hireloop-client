const BASE_URL = process.env.NEXT_PUBLIC_API

// --------------------------------------------------Getting all users--------------------------------------------------
export const GetUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`)
  const result = await res.json()
  return result
}

// ------------------------------------------------Getting users by role------------------------------------------------
export const GetUsersByRole = async (role: string) => {
  const res = await fetch(`${BASE_URL}/users/role/${role}`)
  const result = res.json()
  return result
}

// ------------------------------------------------Getting user by id------------------------------------------------
export const GetUserById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/${id}`)
  const result = await res.json()
  return result
}
