export interface User {
  _id: string
  name: string
  email: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  role: "admin" | "seeker" | "recruiter"
}
