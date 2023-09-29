import AccountDetails from "./account/page"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"

async function Home() {
  // const { data: session, status } = useSession()
  const session = await getServerSession(authOptions)
  const isAuthenticated = !!session?.user

  console.log({ session })

  if (!isAuthenticated) {
    // TODO server side redirection
    redirect("/api/auth/signin")
  }

  return <AccountDetails />
}

export default Home
