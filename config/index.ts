const config = () => {
  let GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL
  const GALOY_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_GALOY_AUTH_ENDPOINT

  if (!GRAPHQL_URL) {
    if (typeof window === "undefined") {
      return {}
    }
    const hostParts = window.location.host.split(".")
    if (hostParts.length <= 3) {
      throw new Error("Missing env variables")
    }
    hostParts[0] = "admin-api"
    GRAPHQL_URL = `https://${hostParts.join(".")}/graphql`
  }
  return {
    GRAPHQL_URL,
    GALOY_AUTH_ENDPOINT,
  }
}

export default config
