"use client"

import InputField from "./core/InputField/InputField";
import { Button } from "./core/Button/Button";
import { Box } from "./containers/Box/Box";
import { useForm } from "react-hook-form";
import { Heading } from "./core/Heading/Heading";
import Table from "./Table/Table";
import { useCallback, useEffect, useState } from "react";
import BarChart from "./BarChart";
import AddField from "./AddField";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { Overlay } from "./containers/Overlay/Overlay";
import { Paragraph } from "./core/Paragraph/Paragraph";


export const schema = z.object({
  name: z.string().min(1, { message: "Name should be more than 1 character" }),
  email: z.string().min(1, { message: "Email is invalid" }).email("Email is invalid"),
  age: z.number({ message: "Age is missing" }).positive("Age should be a positive number").int("Age should be a whole number"),
}).catchall(z.string())

export type Entry = {
  id: string;
  name: string;
  email: string;
  age: number;
} & Record<string, string | number>

const Module = () => {
  const [ showErrors, setShowErrors ] = useState<boolean>(false);
  const [ entries, setEntries ] = useState<Entry[]>([]);
  const [ additionalFields, setAdditionalFields ] = useState<string[]>([]);
  const { handleSubmit, register, reset, setValue, unregister, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit"
  });

  const removeField = useCallback((e) => {
    const field = e.currentTarget.value
    unregister(field)
    setAdditionalFields((prev) => prev.filter((f) => f !== field))
  }, [])

  useEffect(() => {
    let errorTimeout
    
    if (showErrors) {
      errorTimeout = setTimeout(() => {
        setShowErrors(false)
      }, 3000)
    }
    
    return () => {
      clearTimeout(errorTimeout)
    }
  }, [showErrors])

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setShowErrors(true)
    }
  }, [errors?.name, errors?.email, errors?.age])
  
  return (
    <Box gap="lg">
      <Box gap="md" className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Box gap="md">
          <Heading type="h1">Enter Fields</Heading>

          <AddField additionalFields={additionalFields} setAdditionalFields={setAdditionalFields}/>

          <Overlay visibility={showErrors} toggleVisibility={setShowErrors}>
            <Box gap="sm" padding="sm" data-cy="error_message">
              {Object.keys(errors).map((key, index) => {
                const errorMessage = errors[key]?.message;
                return (
                  errorMessage && <Paragraph key={index}>{errorMessage.toString()}</Paragraph>
                );
              })}
              </Box>
          </Overlay>

          <form onSubmit={
            handleSubmit((data) => {
              const entry = { id: uuidv4(), ...data }
              setEntries((prev) => [...prev, entry as Entry])
              reset()
              setAdditionalFields([])
            }
          )}>
            <Box gap="md" padding="0">
              <InputField fullWidth data-cy={"name"} placeholder="Name"  {...register("name", { required: true })} />
              <InputField fullWidth data-cy={"email"} placeholder="Email" type="email"  {...register("email", { required: true })} />
              <InputField fullWidth data-cy={"age"} placeholder="Age" type="number"  {...register("age", { required: true, valueAsNumber: true })} />
              {additionalFields.map((field, index) => (
                <Box key={index} gap="xs" padding="0" className="grid-cols-[5fr,1fr] items-baseline">
                  <InputField data-cy={`input_${field}`} data-testid={field} placeholder={field} {...register(field)} />
                  <Button data-cy={`remove_${field}`} onClick={removeField} value={field} primary={false} label="Remove" size="sm"/>
                </Box>
              ))}
              <Button data-cy="add_entry" primary type="submit" label="Submit"/>
            </Box>
          </form>
          
        </Box>
      </Box>
      <Table entries={entries} setEntries={setEntries}/>
      {entries?.length > 0 && <BarChart data={entries}/>}
    </Box>
  );
}

export default Module