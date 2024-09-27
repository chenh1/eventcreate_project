"use client";

import type { UserFormSubmitValues } from "@/components/constants/types";
import React, { useState, useEffect } from "react"
import { useMutation } from "@apollo/client";
import { Box } from "../../containers/Box/Box";
import { Heading } from "../../core/Heading/Heading";
import { Button } from "../../core/Button/Button";
import { SpanLink } from "../../core/SpanLink/SpanLink";
import { InputText } from "../../fields/InputText/InputText";
import { Paragraph } from "../../core/Paragraph/Paragraph";
import { registerMutation } from "../../../graphql/mutations/register";
import { signIn } from "next-auth/react";
import { emailForgotPasswordMutation } from "../../../graphql/mutations/emailForgotPassword";
import { Checkbox } from "../../fields/Checkbox/Checkbox";

interface LoginFormProps {
  defaultShowResetPasswordPrompt?: boolean;
  defaultIsRegistering: boolean;
  darkModeBorder?: boolean;
  toggleVisibility: (boolean) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ defaultShowResetPasswordPrompt=false, defaultIsRegistering, darkModeBorder, toggleVisibility }: LoginFormProps) => {
  //const client = getClient();
  
  const [ loginError, setLoginError ] = useState<string | null>(null)
  const [ forgotPasswordMessage, setForgotPasswordMessage ] = useState<string | null>(null)
  const [ forgotPasswordSuccessful, setForgotPasswordSuccessful ] = useState<boolean>(false)
  const [ formError, setFormError ] = useState<string | null>(null)
  const [ showPassword, setShowPassword ] = useState<boolean>(false);
  const [ nextAuthLoading, setNextAuthLoading ] = useState<boolean>(false);

  const [ register ] = useMutation(registerMutation);
  const [ forgotPassword, { data: forgotPasswordRes } ] = useMutation(emailForgotPasswordMutation, {
    onCompleted: ({ emailForgotPassword }) => {
      const { isSuccessful, status, statusText } = emailForgotPassword

        if (isSuccessful) {
          setForgotPasswordSuccessful(true)
        }

      if (!isSuccessful && status === 400) {
        const provider = statusText?.replace('Your login provider: ', '') || ''
        const providerName = `${provider.charAt(0).toUpperCase()}${provider.substr(1)}`
        setForgotPasswordMessage(`You signed in using ${providerName}. Close this window and try again.`)
      }
    }
  });


  
  const [ showResetPasswordPrompt, setShowResetPasswordPrompt ] = useState<boolean>(defaultShowResetPasswordPrompt);
  const [ doPasswordsMatch, setDoPasswordsMatch ] = useState<boolean>(true);

  const [ isRegistering, setIsRegistering ] = useState<boolean>(defaultIsRegistering)

  useEffect(() => {
    if (forgotPasswordSuccessful) {
      setTimeout(() => {
        setShowResetPasswordPrompt(false)
        setForgotPasswordSuccessful(false)
      }, 8000)
    }

    if (forgotPasswordMessage) {
      setTimeout(() => {
        setForgotPasswordMessage(null)
      }, 8000)
    }
  }, [forgotPasswordSuccessful, forgotPasswordMessage])

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://biz-web-client-demo-static.s3.us-east-2.amazonaws.com'

  return (
    <Box padding={darkModeBorder ? "md" : "0"} className={`min-w-[300px] ${darkModeBorder ? "relative max-w-lg dark:border-2 dark:border-max-white" : ""}`} hasShadow={darkModeBorder} isRounded={darkModeBorder} gap="md">
      <Box padding="0">
        <Heading type="h4" className="text-center">Login</Heading>

        {/* login with google button*/}
        <div onClick={() => signIn('google')} className="justify-self-center cursor-pointer p-2 h-12 w-full sm:w-12 hover:w-full duration-300 ease-in-out overflow-hidden bg-apex-blue rounded-full">
          <Box padding="0" gap="sm" className="grid-cols-[auto_auto]">
            <Box padding="0" className="w-8 h-8">
              <img width={32} height={32} src={`${baseUrl}/google_icon_e7422bae08.png`} alt="Google icon"/>
            </Box>
            <Box padding="0" className="self-center">
              <Heading type="h4" fontSizeClass="text-xl" className="whitespace-nowrap">Login with Google</Heading>
            </Box>
          </Box>
        </div>
      </Box>
      

      {/* traditional login */}
      {showResetPasswordPrompt ?
        <form onSubmit={(e: UserFormSubmitValues) => {
          e.preventDefault()
          const email = e.target?.email?.value
          
          if (email) {
            forgotPassword({
              variables: {
                email: email,
              }
            })
          }
        }}>
          {forgotPasswordSuccessful ?
            <Box padding="0">
              <Paragraph>Reset link sent to email. Please reset your password and try logging in again.</Paragraph>
            </Box>
            : forgotPasswordMessage ?
              <Box padding="0">
                <Paragraph>You signed in with a Google account. Please click on the Google sign-in button right above this message!</Paragraph>
              </Box>
              :
              <Box padding="0" gap="md">
                <Paragraph size="sm" className="italic">Forgot your password? Enter the email you registered with the password you need to reset and we'll send you an email to update your password.</Paragraph>
                <InputText fullWidth id="email" name="email" placeholder="Email" />
                <Button type="submit" label={"Reset Password"} primary/>
                <a data-testid="cancelForgotPassword" className="text-center" href="javascript:void(0)" onClick={() => {
                  //setTimeout(() => {
                    setShowResetPasswordPrompt(false)
                  //}, 200)
                }}>
                  <SpanLink uncolored>
                    Nevermind, I remember my password
                  </SpanLink>
                </a>
              </Box>
          }
        </form>
        :
        <form onSubmit={(e: UserFormSubmitValues) => {
          e.preventDefault()
          
          const email = e.target?.email?.value
          const password = e.target?.password?.value
          const passwordConfirmation = e.target?.passwordConfirmation?.value
          
          if (isRegistering) {
            if (password !== passwordConfirmation) {
              setFormError("Passwords do not match")
            } else if (!email || !password || !passwordConfirmation) {
              setFormError("Please fill out all fields")
            } else {
              register({
                variables: {
                  username: email,
                  email: email,
                  password: password
                }
              }).then(({ data: { register: registerData } = {} }) => {
                if (registerData && registerData?.jwt) {
                  signIn(
                    'credentials', 
                    { redirect: false, email, password }
                  ).then((response) => {
                    if (response) {
                      const { status, ok, ...rest } = response;
                      if ((status === 401 && !ok) || rest.error === 'CredentialsSignin') {
                        setLoginError('Username and/or password is incorrect')
                      } else {
                        setFormError(null)
                        toggleVisibility(false)
                      }
                      setNextAuthLoading(false)
                    }
                  });
                }
              })
            }
          } else {
            signIn(
              'credentials', 
              { redirect: false, email, password }
            ).then((response) => {
              if (response) {
                const { status, ok, ...rest } = response;
                if ((status === 401 && !ok) || rest.error === 'CredentialsSignin') {
                  setFormError('Username and/or password is incorrect')
                } else {
                  setFormError(null)
                  toggleVisibility(false)
                  setTimeout(() => {
                    
                  }, 200);
                }
                setNextAuthLoading(false)
              }
            });
          }
        }}>
          <Box padding="0" gap={formError ? "micro" : "md"}>
            <Box padding="0" gap="xs">
              <Box padding="0" gap="md">
                <InputText dataCy="login-email-field" fullWidth id="email" name="email" placeholder="Email" />
                <InputText dataCy="login-password-field" fullWidth id="password" name="password" password={!showPassword} placeholder="Password" />
                {isRegistering && <InputText fullWidth id="password" name="passwordConfirmation" password={!showPassword} placeholder="Confirm Password" />}
              </Box>
              <Checkbox onChange={e => setShowPassword(e?.target?.checked)} label="Show password" /> 
            </Box>
            <Box padding="0" gap="md">
              <Box padding="0" gap="xs">
                {formError && <Paragraph textColor="night-black" darkTextColor="hyper-red" className="italic text-center" size="sm">{formError}</Paragraph>}
                <Button data-cy="login-register-cta" label={isRegistering ? "Register" : "Login"} type="submit" primary/>
                {!isRegistering && 
                  <a data-testid="openForgotPassword" className="text-center" href="javascript:void(0)" onClick={() => {
                    //setTimeout(() => {
                      setShowResetPasswordPrompt(true)
                    //}, 200)
                  }}>
                    <SpanLink uncolored>
                      Forgot your password? Click here
                    </SpanLink>
                  </a>
                }
              </Box>
              <Box padding="0">
                <Button onClick={() => setIsRegistering(!isRegistering)} label={isRegistering ? "Login instead" : "New here? Register now"}/>
              </Box>
            </Box>
          </Box>
        </form>
      }
    </Box>
  )
}