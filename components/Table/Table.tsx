import { Box } from "../containers/Box/Box";
import { Paragraph } from "../core/Paragraph/Paragraph";
import { Divider } from "../core/Divider/Divider";
import AdditionalFields from "./AdditionalFields";
import { useCallback, useMemo } from "react";
import EntryField from "./EntryField";
import { requiredFields, genericFieldLabels } from "../constants";
import { Button } from "../core/Button/Button";

const Table = ({ entries, setEntries }) => {
  const entryKeys = useMemo(() => entries?.length > 0 ? Object.keys(entries[0]) : [], [entries?.length]);
  const headers = useMemo(() => [...requiredFields, "additionalFields"], []);
  const cols = useMemo(() => headers.length + 1, [headers]);

  const deleteEntry = useCallback((e) => {
    const id = e.currentTarget.value;
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
  }, [entries, setEntries]);

  return (
    entries?.length > 0 &&
      <div className="overflow-x-auto">
        <Box gap="sm" className="min-w-[1280px]">
          <Box gap="sm" className={`grid-cols-${cols}`}>
            {headers?.map((header, index) => (
              <Paragraph key={index} size="sm">{genericFieldLabels[header]}</Paragraph>
            ))}
          </Box>
          <Divider />
          {entries.map((entry, index) => (
            <Box gap="sm" key={index} className={`grid-cols-${cols}`}>
              {Object.keys(entry).filter(item => requiredFields.includes(item)).map((key, index) => (
                <EntryField entryId={entry.id} key={index} name={key} value={entry[key]} entries={entries} setEntries={setEntries}/>
              ))}
              <AdditionalFields index={index} entries={entries} setEntries={setEntries} fields={entry}/>
              <Button data-cy={`delete_entry_${index}`} primary={false} label="DELETE" value={entry.id} onClick={deleteEntry} />
            </Box>
          ))}
        </Box>
      </div>
  );
}

export default Table;