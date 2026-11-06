import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/auth"

export const {
  signIn,
  signUp,
  useSession,
  getSession,
  signOut,
  verifyEmail,
  resetPassword,
  requestPasswordReset,
} = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
})
