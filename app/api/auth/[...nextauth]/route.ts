import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { Provider } from "next-auth/providers"

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },
  }),
]

const url = new URL(process.env.NEXTAUTH_URL ?? "")
const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith("https://")
const parts = url.hostname.split(".")
const topDomainWithTLD =
  parts.length > 1
    ? `${parts[parts.length - 2]}.${parts[parts.length - 1]}`
    : url.hostname

export const authOptions = {
  providers,
  cookies: {
    sessionToken: {
      name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: `.${topDomainWithTLD}`,
        secure: useSecureCookies,
      },
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
