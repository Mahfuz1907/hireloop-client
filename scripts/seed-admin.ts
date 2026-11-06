import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI as string

async function seedAdmin() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined!")
    process.exit(1)
  }

  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const db = client.db("hireloop")
    const usersCollection = db.collection("user")

    const adminEmail = process.env.ADMIN_EMAIL

    // 1. Check korun admin age theke ache kina
    const existingAdmin = await usersCollection.findOne({ email: adminEmail })
    if (existingAdmin) {
      console.log("Admin account already exists!")
      return
    }

    // 2. Admin Password Hash korun
    const rawPassword = process.env.ADMIN_PASSWORD as string
    const hashedPassword = await bcrypt.hash(rawPassword, 10)

    if (!rawPassword) {
      console.error("❌ ADMIN_PASSWORD is not set in .env!")
      process.exit(1)
    }

    // 3. Admin user object toiri korun (Better Auth collection schema অনুযায়ী)
    const adminUser = {
      name: "System Admin",
      email: adminEmail,
      emailVerified: true,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const userResult = await usersCollection.insertOne(adminUser)

    // 4. Better Auth-er `account` collection-e credential entry save korun
    const accountCollection = db.collection("account")
    await accountCollection.insertOne({
      userId: userResult.insertedId.toString(),
      accountId: adminEmail,
      providerId: "credential",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log("✅ Admin account created successfully!")
    console.log(`Email: ${adminEmail}`)
    console.log(`Password: ${rawPassword}`)
  } catch (error) {
    console.error("Error seeding admin:", error)
  } finally {
    await client.close()
  }
}

seedAdmin()
