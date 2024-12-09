import { Box } from "../containers/Box/Box";
import { Paragraph } from "../core/Paragraph/Paragraph";

function findEntryWithMostKeys(entries) {
  let maxKeys = 0;
  let objectWithMostKeys = {};

  for (const obj of entries) {
    const keysLength = Object.keys(obj).length;
    if (keysLength > maxKeys) {
      maxKeys = keysLength;
      objectWithMostKeys = obj;
    }
  }

  return objectWithMostKeys;
}

const Headers = ({ entries }) => {
  const headers = Object.keys(findEntryWithMostKeys(entries));
  console.log("headers ", headers)
  return (
    <Box gap="sm">
      {headers.map((header, index) => (
        <Paragraph key={index} size="sm">{header}</Paragraph>
      ))}
    </Box>
  );
}

export default Headers;