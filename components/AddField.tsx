"use client"

import InputField from "./core/InputField/InputField";
import { Button } from "./core/Button/Button";
import { Box } from "./containers/Box/Box";
import { useForm } from "react-hook-form";
import { memo, useEffect, useState } from "react";
import { Paragraph } from "./core/Paragraph/Paragraph";

interface AddFieldProps {
  additionalFields: string[];
  setAdditionalFields: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddField = memo(({ additionalFields, setAdditionalFields }: AddFieldProps) => {
  const { handleSubmit, register, reset } = useForm();
  const [ error, setError ] = useState(false);

  useEffect(() => {
    let errorTimeout
    
    if (error) {
      errorTimeout = setTimeout(() => {
        setError(false)
      }, 3000)
    }
    
    return () => {
      clearTimeout(errorTimeout)
    }
  }, [error])

  return (
    <form onSubmit={
      handleSubmit((data) => {
        const { fieldName } = data
        console.log(data)
        if (additionalFields.includes(fieldName)) {
          setError(true)
        } else {
          setAdditionalFields((prev) => [...prev, data.fieldName])
          reset()
        }
      })
    }>
      <Box gap="md" padding="0" className="grid-cols-2 items-baseline">
        <InputField data-cy="input_add_field" placeholder="Field Name"  {...register("fieldName", { required: true })} />
        <Button data-cy="add_field" primary={false} type="submit" label="Add field" />
        <Paragraph textColor="hyper-red" size="sm">{error && "Field already exists"}</Paragraph>
      </Box>
    </form>
  );
})

export default AddField