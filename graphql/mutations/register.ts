import { gql, DocumentNode } from "@apollo/client";

export type RegisterRes = {
  user: {
    username: string;
    email: `${string}@${string}.${string}`
  };
  jwt: string;
}

export const registerMutation: DocumentNode = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(input: {username: $username, email: $email, password: $password} ) {
      user {
        username
        email
      }
      jwt
    }
  }
`;