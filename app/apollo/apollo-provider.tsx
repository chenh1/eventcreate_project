"use client";

import React from "react";
import {
  ApolloLink,
  HttpLink,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.warn(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.warn(`[Network error]: ${networkError}`);
})

function makeClient() {
  const httpLink = new HttpLink({
      uri: `${process.env.API_URL || "http://127.0.0.1:1337"}/graphql`,
      fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache(),
    link: ApolloLink.from([ errorLink, httpLink ]),
  });
}


export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}