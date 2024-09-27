import { useQuery } from "@apollo/client";
import { flippersQuery } from "../../graphql/queries/flippers";

// Define types for the attributes and the response
interface FlipperAttributes {
  [key: string]: any; // Adjust the type based on the actual shape of attributes
}

interface FlipperData {
  attributes: FlipperAttributes;
}

interface FlipperManagerData {
  data: FlipperData;
}

interface FlipperManagerResponse {
  flipperManager: FlipperManagerData;
}

interface UseFlippersParams {
  key?: string;
  keys?: string[];
}

interface FlippersResult {
  [key: string]: any; // Adjust the type based on the actual shape of flippers
}

export const useFlippers = ({ key, keys }: UseFlippersParams): FlippersResult => {
  // Fetch data from the query
  const { data } = useQuery<FlipperManagerResponse>(flippersQuery);
  
  // Extract attributes from the fetched data
  const attributes = data?.flipperManager?.data?.attributes || {};

  // Initialize an empty object to store the flippers
  const flippers: FlippersResult = {};

  if (attributes) {
    if (keys?.length ?? 0 > 0) {
      keys?.forEach(key => {
        if (attributes[key]) {
          flippers[key] = attributes[key];
        }
      });
    } else if (key && attributes[key]) {
      flippers[key] = attributes[key];
    }
  }
  
  return flippers;
};
