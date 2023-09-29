import AccountDetails from "./account"

import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

function Home() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"

  console.log({ session, status })

  const router = useRouter()

  if (!isAuthenticated) {
    // TODO server side redirection
    router.push("/api/auth/signin")
  }

  return <AccountDetails />
}

export default Home
