import { getClient } from "../../app/apollo/client";
import { flippersQuery } from "../../graphql/queries/flippers"; 
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

interface FlipperAttributes {
  [key: string]: any;
}

interface FlipperManagerData {
  attributes?: FlipperAttributes;
}

interface FlippersQueryResponse {
  data: {
    flipperManager: {
      data: FlipperManagerData;
    };
  };
}

interface GetFlippersSSRParams {
  key: string;
  keys?: string[];
}

export const getFlippersSSR = async ({ key, keys }: GetFlippersSSRParams): Promise<Record<string, any>> => {
  const client: ApolloClient<NormalizedCacheObject> = getClient();
  
  const { data }: FlippersQueryResponse = await client.query({
    query: flippersQuery
  });

  const attributes = data.flipperManager?.data?.attributes || {};
  const flippers: Record<string, any> = {};

  if (keys && keys.length > 0) {
    keys.forEach(key => {
      flippers[key] = attributes[key];
    });
  } else {
    flippers[key] = attributes[key];
  }

  return flippers;
};
