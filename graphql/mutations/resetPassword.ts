import { gql, DocumentNode } from "@apollo/client";

export const resetPasswordMutation: DocumentNode = gql`
  mutation ResetPassword($password: String!, $passwordConfirmation: String!, $code: String!) {
    resetPassword(password: $password, passwordConfirmation: $passwordConfirmation, code: $code) {
      user {
        email
      }
    }
  }
`;