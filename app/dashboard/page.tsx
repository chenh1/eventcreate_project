import { Section } from "../../components/containers/Section/Section";
import { AllPaths } from "../../components/modules/AllPaths/AllPaths";
import { CurrentPath } from "../../components/modules/CurrentPath/CurrentPath";
import getSeoMetaData from "../../components/utils/getSeoMetaData";
import { UnderMaintenanceCatcher } from "../../components/modules/UnderMaintenanceCatcher/UnderMaintenanceCatcher";

export async function generateMetadata(
  { params, searchParams },
  parent
) {
  const reqUrl = `${process.env.API_URL}/api/static-page-seo-metadata?filters[pageName][$eq]=dashboard`
  const seoMetaData = await getSeoMetaData(reqUrl)
  return seoMetaData;
}

export default async function Dashboard(props) {
  return (
    <UnderMaintenanceCatcher>
      <Section className="min-h-screen bg-night-black dark">
        <CurrentPath/>
      </Section>
      <Section heightClass="py-0" className="bg-gradient-to-b from-max-white to-mach-indigo-300">
        <AllPaths/> 
      </Section>
    </UnderMaintenanceCatcher>
  )
}
