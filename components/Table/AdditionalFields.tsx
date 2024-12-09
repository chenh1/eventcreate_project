import { useCallback, useState } from "react";
import { Overlay } from "../containers/Overlay/Overlay";
import { Button } from "../core/Button/Button";
import { Box } from "../containers/Box/Box";
import { Paragraph } from "../core/Paragraph/Paragraph";
import { Heading } from "../core/Heading/Heading";
import EntryField from "./EntryField";
import { requiredFields } from "../constants";

const AdditionalFields = ({ index, fields, entries, setEntries }) => {
  const [ showFields, setShowFields ] = useState(false);
  const keys = Object.keys(fields).filter(key => key !== "id" && !requiredFields.includes(key));

  const deleteProperty = useCallback((e) => {
    const key = e.currentTarget.value;
    const { [key]: deleted, ...rest } = fields;
    
    const updatedEntries = entries.map((entry) => {
      if (entry.id === fields.id) {
        return { ...rest }
      }
      return entry
    })

    setEntries(updatedEntries)
  }, [fields, entries, setEntries]);
  
  return (
    <div>
      {keys?.length > 0 ? <Button data-cy={`see_fields_${index}`} primary={true} label="See Fields" onClick={() => setShowFields(true)} /> : <Paragraph>-</Paragraph>}
      <Overlay visibility={showFields} toggleVisibility={setShowFields}>
        <Box gap="sm" padding="lg">
          <Heading type="h2">Additional Fields</Heading>
          {keys.map((field, index) => (
            <div key={index} className="flex gap-3 items-center">
              <Paragraph>{`${field}: `}</Paragraph>
              <EntryField entryId={fields.id} name={field} value={fields[field]} entries={entries} setEntries={setEntries}/>
              <Button primary={false} label="X" value={field} onClick={deleteProperty} />
            </div>
          ))}
        </Box>
      </Overlay>
    </div>
  );
}

export default AdditionalFields;