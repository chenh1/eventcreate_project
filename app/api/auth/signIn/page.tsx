import React from "react";
import { Section } from "../../../../components/containers/Section/Section";
import Message from "./message";

export default async function SignIn(props) {
  // prompt user to sign in if unauthenticated. User can choose not to sign in but let them know they won't be able to save progress

  return (
    <Section addNavSpace heightClass="h-screen" className="dark bg-night-black">
      <Message/>
    </Section>
  )
}
