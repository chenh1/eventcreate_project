import { getClient } from "../apollo/client";
import privacyPageQuery from "../../graphql/queries/privacypage";
import { Section } from "../../components/containers/Section/Section";
import { Box } from "../../components/containers/Box/Box";
import { Markdown } from "../../components/utils/Markdown";
import { Heading } from "../../components/core/Heading/Heading";
import getSeoMetaData from "../../components/utils/getSeoMetaData";

export async function generateMetadata(
  { params, searchParams },
  parent
) {
  const reqUrl = `${process.env.API_URL}/api/static-page-seo-metadata?filters[pageName][$eq]=privacy-policy`
  const seoMetaData = await getSeoMetaData(reqUrl)
  return seoMetaData;
}

export default async function PrivacyPolicy(props) {
  const client = getClient();
  const { data } = await client.query({ query: privacyPageQuery });
  const {
    title,
    content
  } = data.privacyPage.data.attributes || {};
  
  return (
    <Section addNavSpace className="min-h-screen bg-night-black dark">
      <Box padding="0" gap="sm">
        <Heading type="h1">{title}</Heading>
        <Markdown gap="md">{content}</Markdown>
      </Box>
    </Section>
  )
}
