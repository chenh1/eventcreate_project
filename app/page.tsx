
import { Box } from "../components/containers/Box/Box";
import { Section } from "../components/containers/Section/Section";
import Module from "../components/Module";


export default async function Home() {
  return (
      <Section heightClass="h-max" className="dark bg-night-black py-20">
        <Box padding="0" className="h-screen relative items-center">
          <Module />
        </Box>
      </Section>
  )
}
