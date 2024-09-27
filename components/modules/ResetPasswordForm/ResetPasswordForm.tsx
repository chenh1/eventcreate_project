"use client";

import type { UserFormSubmitValues } from "@/components/constants/types";
import React, { useState } from "react"
import { useMutation } from "@apollo/client";
import { Box } from "../../containers/Box/Box";
import { Button } from "../../core/Button/Button";
import { Paragraph } from "../../core/Paragraph/Paragraph";
import { useRouter, useSearchParams } from "next/navigation";
import { InputText } from "../../fields/InputText/InputText";
import { resetPasswordMutation } from "../../../graphql/mutations/resetPassword";
import { Checkbox } from "../../fields/Checkbox/Checkbox";

export const ResetPasswordForm: React.FC = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [ formError, setFormError ] = useState<string>("")
  const [ showPassword, setShowPassword ] = useState<boolean>(false);
  const code = params?.get("code");

  if (!code) {
    router.replace('/')
  }

  const [ resetPassword, { data } ] = useMutation(resetPasswordMutation);

  return (
    <form onSubmit={(e: UserFormSubmitValues) => {
      e.preventDefault()
      const password = e.target.password.value
      const passwordConfirmation = e.target.passwordConfirmation.value

      if (!code) {
        setFormError("Looks like the url has expired. Please try again.")
      } else if (password !== passwordConfirmation) {
        setFormError("Passwords do not match")
      } else {
        resetPassword({
          variables: {
            code,
            password,
            passwordConfirmation
          }
        }).then(({ data: { resetPassword } = {}}) => {
          if (resetPassword?.user?.email) {
            router.replace('/api/auth/signIn')
          }
        })
      }
    }}>
      <Box padding="0" gap="md" className="max-w-[300px]">
        <InputText fullWidth id="password" name="password" password={!showPassword} placeholder="New Password" />
        <InputText fullWidth id="password" name="passwordConfirmation" password={!showPassword} placeholder="Confirm New Password" />
        <Checkbox onChange={e => setShowPassword(e?.target?.checked)} label="Show password" /> 
        <Button type="submit" label={"Reset Password"} primary/> 
        {formError && <Paragraph textColor="hyper-red" darkTextColor="hyper-red" className="italic text-center" size="sm">{formError}</Paragraph>}
      </Box>
    </form>
  )
}