import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr"
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"
import { cookies } from "next/headers"

export const { getClient } = registerApolloClient(() => {
  const cookieStore = cookies()

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: process.env.CORE_URL,

      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      fetchOptions: { cache: "no-store" },
      headers: {
        cookie: cookieStore.toString(),
      },
    }),
  })
})
