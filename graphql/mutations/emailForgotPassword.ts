import { gql, DocumentNode } from "@apollo/client";

export type ForgotPasswordRes = {
  isSuccessful: boolean;
  status: number;
  statusText: string;
}

export const emailForgotPasswordMutation: DocumentNode = gql`
  mutation EmailForgotPassword($email: String!) {
    emailForgotPassword(email: $email) {
      isSuccessful
      status
      statusText
    }
  }
`;