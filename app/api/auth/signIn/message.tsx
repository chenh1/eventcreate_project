'use client'

import React from "react";
import { LoginForm } from "../../../../components/modules/LoginForm/LoginForm";
import { Box } from "../../../../components/containers/Box/Box";
import { useSearchParams } from "next/navigation";
import { Paragraph } from "../../../../components/core/Paragraph/Paragraph";
import { UnderMaintenanceCatcher } from "../../../../components/modules/UnderMaintenanceCatcher/UnderMaintenanceCatcher";

const errorMessages = {
  callback: "It looks like you've registered with email and password in the past but you're trying to log in using Google. If you forgot your password, follow the steps below:",
  default: "Something went wrong. Please try again."
}

export default function Message(props) {
  const searchParams = useSearchParams()
  const errorCode = searchParams?.get('error')?.toLowerCase()
  const errorMessage = errorMessages[errorCode ?? "default"]
  
  return (
    <UnderMaintenanceCatcher>
      <Box padding="0" gap="lg" className="w-full justify-center items-center">
        {errorMessage && 
          <Box padding="0" className="justify-center">
            <Box padding="0" className="max-w-[300px]">
              <Paragraph className="text-center" textColor="hyper-red">{errorMessage}</Paragraph>
            </Box>
          </Box>
        }
        <LoginForm toggleVisibility={() => {}} defaultIsRegistering={false} defaultShowResetPasswordPrompt={errorCode === 'callback'}/>
      </Box>
    </UnderMaintenanceCatcher>
  ) 
}
