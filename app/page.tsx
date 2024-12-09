
import { Box } from "../components/containers/Box/Box";
import { Section } from "../components/containers/Section/Section";
import Module from "../components/Module";


export default async function Home() {
  return (
      <Section heightClass="h-screen" className="dark bg-night-black">
        <Box padding="0" className="h-screen relative items-center">
          <Module />
        </Box>
      </Section>
  )
}
