"use client"

import { useState } from "react"
import { gql, useMutation } from "@apollo/client"

import { validAuthCode, reportError } from "../utils"
import { useRouter } from "next/navigation"

const LOGIN = gql`
  mutation login($input: UserLoginInput!) {
    mutationData: userLogin(input: $input) {
      errors {
        message
      }
      authToken
    }
  }
`

const AuthCodeForm: React.FC<{ phoneNumber: string }> = ({ phoneNumber }) => {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [login, { loading: userLoginLoading }] = useMutation(LOGIN)

  async function submitOtp(event: any) {
    event.preventDefault()

    const { errors: loginErrors, data } = await login({
      variables: { input: { phone: phoneNumber, code: otp } },
    })

    if (loginErrors) {
      return reportError(loginErrors.join(","))
    }

    const { errors, authToken } = data.mutationData

    if (errors.length > 0) {
      return reportError(errors[0].message)
    }

    if (authToken) {
      window.sessionStorage.setItem("token", authToken)
      router.push("/account")
    } else {
      reportError("Could not execute operation")
    }
  }

  return (
    <form onSubmit={submitOtp}>
      <input
        id="otp"
        autoFocus
        required
        type="text"
        placeholder="Enter Auth Code"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
      />
      <p className="text-red-500 mt-2 text-xs italic">
        {otp && !validAuthCode(otp) ? "Invalid auth code" : ""}
      </p>
      <button
        type="submit"
        disabled={!validAuthCode(otp)}
        className="bg-blue-400 hover:bg-blue-500 text-white font-bold p-2 my-4 w-full border border-blue-500 rounded disabled:opacity-50"
      >
        {userLoginLoading ? "Loading..." : "Login"}
      </button>
    </form>
  )
}

export default AuthCodeForm
