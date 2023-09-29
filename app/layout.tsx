// These styles apply to every route in the application
import "../styles/main.css"

import { Metadata } from "next"
import { ApolloWrapper } from "./graphql"
import SideBar from "../components/side-bar"

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Welcome to Galoy Admin Panel",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <Script src="/gt.js" /> */}

      <body>
        <div className="flex h-screen bg-gray-50">
          <SideBar />
          <div className="flex flex-col flex-1 w-full">
            <main className="h-full overflow-y-auto">
              <div className="container grid mx-auto">
                {" "}
                <ApolloWrapper>{children}</ApolloWrapper>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
