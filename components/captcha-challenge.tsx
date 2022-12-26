"use client"

import { useCallback, useEffect, useState } from "react"
import { gql, useMutation } from "@apollo/client"

import AuthCodeForm from "./auth-code-form"

const CAPTCHA_CREATE_CHALLENGE = gql`
  mutation captchaCreateChallenge {
    captchaCreateChallenge {
      errors {
        message
      }
      result {
        id
        challengeCode
        newCaptcha
        failbackMode
      }
    }
  }
`

const CAPTCHA_REQUEST_AUTH_CODE = gql`
  mutation captchaRequestAuthCode($input: CaptchaRequestAuthCodeInput!) {
    captchaRequestAuthCode(input: $input) {
      errors {
        message
      }
      success
    }
  }
`

const CaptchaChallenge: React.FC<{ phoneNumber: string }> = ({ phoneNumber }) => {
  const [createCaptchaChallenge, { loading: createLoading }] = useMutation(
    CAPTCHA_CREATE_CHALLENGE,
  )
  const [requestCaptchaAuthCode, { loading: requestLoading }] = useMutation(
    CAPTCHA_REQUEST_AUTH_CODE,
  )

  const [captchaState, setCaptchaState] = useState<any>({ status: "loading" })

  const captchaHandler = useCallback(
    (captchaObj: any) => {
      const onSuccess = async () => {
        const result = captchaObj.getValidate()

        try {
          const { errors, data } = await requestCaptchaAuthCode({
            variables: {
              input: {
                phone: phoneNumber,

                challengeCode: result.geetest_challenge,
                validationCode: result.geetest_validate,
                secCode: result.geetest_seccode,
              },
            },
          })

          const gqlErrors = errors ?? data?.captchaRequestAuthCode?.errors

          setCaptchaState({
            status: data?.captchaRequestAuthCode?.success ? "success" : "error",
            errorsMessage: gqlErrors?.map((err: any) => err.message).join(","),
          })
        } catch (error) {
          console.debug("[Captcha error]:", error)

          setCaptchaState({
            status: "error",
            errorsMessage: "Invalid verification. Please try again",
          })
        }
      }
      captchaObj.appendTo("#captcha")
      captchaObj
        .onReady(() => {
          setCaptchaState({ status: "ready" })
          captchaObj.verify()
        })
        .onSuccess(onSuccess)
        .onError((err: unknown) => {
          console.debug("[Captcha err]:", err)
          setCaptchaState({
            status: "error",
            errorsMessage: "Invalid verification. Please try again",
          })
        })
    },
    [phoneNumber, requestCaptchaAuthCode],
  )

  useEffect(() => {
    const initCaptcha = async () => {
      try {
        const { data, errors } = await createCaptchaChallenge()

        const gqlErrors = errors ?? data?.captchaCreateChallenge?.errors

        if (gqlErrors.length > 0) {
          setCaptchaState({
            status: "error",
            errorsMessage: gqlErrors?.map((err: any) => err.message).join(","),
          })
        }

        const result = data?.captchaCreateChallenge?.result

        if (result) {
          const { id, challengeCode, newCaptcha, failbackMode } = result as any
          ;(window as any).initGeetest(
            {
              gt: id,
              challenge: challengeCode,
              offline: failbackMode,
              new_captcha: newCaptcha,

              lang: "en",
              product: "bind",
            },
            captchaHandler,
          )
        } else {
          throw new Error("No result from createCaptchaChallenge")
        }
      } catch (error) {
        console.debug("[Init captcha err]:", error)

        setCaptchaState({
          status: "error",
          errorsMessage: "Invalid verification. Please try again",
        })
      }
    }
    initCaptcha()
  }, [captchaHandler, createCaptchaChallenge])

  if (captchaState.status === "success") {
    return <AuthCodeForm phoneNumber={phoneNumber} />
  }

  const isLoading = captchaState.status === "loading" || createLoading || requestLoading
  const hasError = !isLoading && captchaState.status === "error"

  return (
    <div className="captcha-challenge">
      <div className="intro">{"Verify you are human"}</div>
      <div id="captcha">{isLoading && <div className="loading">Loading...</div>}</div>
      {hasError && (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          {captchaState.errorsMessage}
        </div>
      )}
    </div>
  )
}

export default CaptchaChallenge
