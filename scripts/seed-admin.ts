import dotenv from "dotenv"

dotenv.config({ path: ".env" })

async function seedAdmin() {
  try {
    const { auth } = await import("@/auth")

    const adminEmail = process.env.ADMIN_EMAIL as string
    const adminPassword = process.env.ADMIN_PASSWORD as string

    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI is not defined in .env.local!")
      process.exit(1)
    }

    console.log("Seeding admin user via Better Auth API...")

    const response = await auth.api.signUpEmail({
      body: {
        email: adminEmail,
        password: adminPassword,
        name: "Random Admin",
        role: "admin",
      },
    })

    console.log("✅ Admin created successfully:", response)
  } catch (error) {
    console.error("❌ Error seeding admin:", error)
  }
}

seedAdmin()
