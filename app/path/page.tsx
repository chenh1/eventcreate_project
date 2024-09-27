import { getClient } from "../apollo/client";
import pathQuestionnaireQuery from "../../graphql/queries/pathQuestionnaire";
import { Section } from "../../components/containers/Section/Section";
import { PathQuestionnaire } from "../../components/modules/PathQuestionnaire/PathQuestionnaire";
import { Box } from "../../components/containers/Box/Box";
import getSeoMetaData from "../../components/utils/getSeoMetaData";

export async function generateMetadata(
  { params, searchParams },
  parent
) {
  const reqUrl = `${process.env.API_URL}/api/static-page-seo-metadata?filters[pageName][$eq]=path`
  const seoMetaData = await getSeoMetaData(reqUrl)
  return seoMetaData;
}

export default async function Path(props) {
  const client = getClient();
  const { data } = await client.query({ query: pathQuestionnaireQuery });
  const {
    title,
    questions = []
  } = data.pathQuestionnaire.data.attributes || {};
  
  return (
    <Section heightClass="py-0" className="min-h-screen bg-night-black dark">
      <Box padding="0" className="place-items-center min-h-screen">
        <PathQuestionnaire questions={questions}/>
      </Box>
    </Section>
  )
}
