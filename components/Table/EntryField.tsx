import { useCallback, useEffect, useRef, useState } from "react";
import { Paragraph } from "../core/Paragraph/Paragraph";
import InputField from "../core/InputField/InputField";
import { inputTypes, requiredFields } from "../constants";
import { z } from "zod";
import { schema } from "../Module";

const EntryField = ({ entryId, name, value, entries, setEntries }) => {
  const [ isEditing, setIsEditing ] = useState(false);
  const [ requiredFieldError, setRequiredFieldError ] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      let val = e.currentTarget.value

      if (name === 'age') {
        val = parseInt(val)
      }

      if (requiredFields.includes(name)) {
        const partialObject = { [name]: val };
        const partialSchema = z.object({ [name]: schema.shape[name] });
        const res = partialSchema.safeParse(partialObject)

        if (!res.success) {
          setRequiredFieldError(true)
          return
        }
      }

      const updatedEntries = entries.map((entry) => {
        if (entry.id === entryId) {
          return { ...entry, [name]: val }
        }
        return entry
      })
      setEntries(updatedEntries)
      setIsEditing(false)
    }
  }, [entries, setEntries, name, value]);

  useEffect(() => {
    if (requiredFieldError) {
      const errorMessageTimeout = setTimeout(() => {
        setRequiredFieldError(false)
      }, 3000)

      return () => clearTimeout(errorMessageTimeout)
    }
  }, [requiredFieldError])

  return (
    <div>
      <div className={`flex gap-2 ${isEditing ? "hidden" : "block"} relative`}>
        <Paragraph>{value}</Paragraph>
        <div
          data-cy={`edit_${name}_${value}`}
          className="cursor-pointer"
          onClick={() => {
            setIsEditing(prevValue => !prevValue)
            if (inputRef.current) {
              inputRef.current.value = value
            }
          }}
        >
            ✏️
        </div>
      </div>
      <div className={isEditing ? "block" : "hidden"}>
        <InputField data-cy={`input_${name}_${value}`} type={inputTypes[name] || "text"} ref={inputRef} name={name} onKeyDown={handleKeyDown} onBlur={() => setIsEditing(false)}/>
      </div>
      {requiredFieldError &&
        <div data-cy={`error_${name}_${value}`} className="absolute">
          <Paragraph size="sm" textColor="hyper-red">Invalid Value</Paragraph>
        </div>
      }
    </div>
  );
}

export default EntryField;