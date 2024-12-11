
import { Box } from "../components/containers/Box/Box";
import { Section } from "../components/containers/Section/Section";
import Module from "../components/Module";


export default async function Home() {
  return (
    <Section className="py-20 min-h-screen">
      <Box padding="0" className="relative items-center min-h-full">
        <Module />
      </Box>
    </Section>
  )
}
