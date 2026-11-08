export interface User {
  _id: string
  name: string
  email: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  role: "admin" | "seeker" | "recruiter"
}

export interface Job {
  _id: string
  title: string
  companyName: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  qualifications: string
  recruiterName: string
  recruiterEmail: string
}

export interface AddJobTypes {
  title: string
  companyName: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  qualifications: string
  recruiterName: string | undefined
  recruiterEmail: string | undefined
}
