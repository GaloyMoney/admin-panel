import {
  AccountDetailsByEmailDocument,
  AccountDetailsByEmailQuery,
} from "../../generated"
import { getClient } from "../graphql-rsc"
import Image from "next/image"
import SearchIcon from "../../components/icons/search.svg"

const processQuery = async (formData: FormData) => {
  "use server"
  const search = formData.get("search") as string

  const data = await getClient().query<AccountDetailsByEmailQuery>({
    query: AccountDetailsByEmailDocument,
    variables: { email: search },
  })

  console.log(data)
}

export default async function Account() {
  return (
    <header className="z-40 py-4 bg-white shadow-bottom">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-blue-600">
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="border rounded relative w-full max-w-xl p-2 focus-within:text-blue-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <Image
                src={SearchIcon}
                alt="search"
                className="w-4 h-4"
                aria-hidden="true"
              />
            </div>
            <form action={processQuery}>
              <input
                id="search"
                autoFocus
                type="text"
                aria-label="Search"
                className="block w-full text-sm focus:outline-none form-input leading-5 focus:border-blue-400 focus:shadow-outline-blue pl-8 text-gray-700"
                placeholder={"Enter user's phone number or username or email"}
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}
