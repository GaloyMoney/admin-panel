import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"

async function Home() {
  const session = await getServerSession(authOptions)
  const isAuthenticated = !!session?.user

  if (!isAuthenticated) {
    redirect("/api/auth/signin")
  }

  redirect("/account")
}

export default Home
