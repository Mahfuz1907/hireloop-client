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
  status: "Active" | "Expired"
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
  status: string
  responsibilities: string
  qualifications: string
  recruiterName: string | undefined
  recruiterEmail: string | undefined
}

export interface AddBookMarkTypes {
  jobId: string
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
  status: string
  responsibilities: string
  qualifications: string
  recruiterName: string
  recruiterEmail: string
  jobSeekerName: string | undefined
  jobSeekerEmail: string | undefined
}

export interface BookMarkTypes {
  _id: string
  jobId: string
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
  status: string
  responsibilities: string
  qualifications: string
  recruiterName: string
  recruiterEmail: string
  jobSeekerName: string | undefined
  jobSeekerEmail: string | undefined
}
