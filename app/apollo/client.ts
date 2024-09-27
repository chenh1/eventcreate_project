// import { ApolloLink, HttpLink } from "@apollo/client";
// import { onError } from "@apollo/client/link/error";

// import {
//   NextSSRInMemoryCache,
//   NextSSRApolloClient,
// } from "@apollo/experimental-nextjs-app-support/ssr";
// import { NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr";
// import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";}

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path, ...rest }) => {
//       Object.keys(rest)?.map(key => console.log(key, rest[key]))
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     });
//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

// const httpLink = new HttpLink({
//   uri: `${process.env.API_URL || "http://127.0.0.1:1337"}/graphql`,
// })

// export const { getClient } = registerApolloClient(() => {
//   return new NextSSRApolloClient({
//     cache: new NextSSRInMemoryCache(),
//     link: ApolloLink.from([errorLink, httpLink]),
//   });
// });

import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: `${process.env.API_URL || "http://127.0.0.1:1337"}/graphql`,
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});