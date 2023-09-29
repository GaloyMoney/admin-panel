import Head from "next/head"
import type { AppProps } from "next/app"

import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { ApolloLink } from "@apollo/client"

import config from "../config"
import { SessionProvider } from "next-auth/react"

import "../styles/main.css"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { GRAPHQL_URL } = config()

  const cache = new InMemoryCache()
  const httpLink = new HttpLink({ uri: GRAPHQL_URL, fetch, credentials: "include" })

  const authLink = setContext((_, { headers }) => {
    if (typeof window === "undefined") {
      return headers
    }
    return {
      headers: {
        ...headers,
      },
    }
  })

  const errorLink = onError(({ networkError }) => {
    console.log({ networkError })
    // signout?
  })

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
    cache,
    credentials: "include",
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
      },
      query: {
        fetchPolicy: "no-cache",
      },
    },
  })

  return (
    <>
      <Head>
        <title>Admin Panel</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Galoy admin panel" />
      </Head>
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp
