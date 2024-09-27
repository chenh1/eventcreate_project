import { getClient } from "../apollo/client";
import faqsPageQuery from "../../graphql/queries/faqspage";
import { Section } from "../../components/containers/Section/Section";
import { Box } from "../../components/containers/Box/Box";
import { Markdown } from "../../components/utils/Markdown";
import { Heading } from "../../components/core/Heading/Heading";
import { AccordionDivider } from "../../components/containers/AccordionDivider/AccordionDivider";
import { Paragraph } from "../../components/core/Paragraph/Paragraph";
import { UnderMaintenanceCatcher } from "../../components/modules/UnderMaintenanceCatcher/UnderMaintenanceCatcher";
import getSeoMetaData from "../../components/utils/getSeoMetaData";

export async function generateMetadata(
  { params, searchParams },
  parent
) {
  const reqUrl = `${process.env.API_URL}/api/static-page-seo-metadata?filters[pageName][$eq]=faqs`
  const seoMetaData = await getSeoMetaData(reqUrl)
  return seoMetaData;
}

export default async function Faqs(props) {
  const client = getClient();
  const { data, error } = await client.query({ query: faqsPageQuery });
  const {
    title,
    description,
    faq
  } = data.faqsPage?.data?.attributes || {};

  // format faq data by category
  const faqByCategory = faq?.reduce((acc, curr) => {
    const category = curr.category.data.attributes.displayName;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(curr);
    return acc;
  }, {});

  // sort from most questions to least
  const categoryKeys = Object.keys(faqByCategory);
  categoryKeys.sort((a, b) => {
    return faqByCategory[b].length - faqByCategory[a].length;
  });
  
  return (
    <Section addNavSpace className="min-h-screen bg-night-black dark">
      <Box padding="0" gap="xl">
        <Heading type="h1">{title}</Heading>
        <UnderMaintenanceCatcher error={error ? error.message : !data?.faqsPage?.data?.attributes ? "No data available" : undefined} noData>
          <Box padding="0" gap="xl" className="md:grid-cols-2 items-start">
            {categoryKeys.map((category, i) => {
              return (
                <Box key={i} gap="md" isRounded hasShadow className="bg-night-black-300">
                  <Heading type="h3">{category}</Heading>
                  <Box padding="0" gap="md">
                    {faqByCategory[category].map((faq, i) => {
                      const { question, answer, answerRich } = faq || {};
                      return (
                        <AccordionDivider alwaysPushTriangle key={i} label={<Heading type="h4">{question}</Heading>} className="text-white">
                          {answerRich && <Markdown size="xs">{answerRich}</Markdown>}
                          {!answerRich && <Paragraph>{answer}</Paragraph>}
                        </AccordionDivider>
                      )
                    })}
                  </Box>
                </Box>
              )
            })}
          </Box>
        </UnderMaintenanceCatcher>
      </Box>
    </Section>
  )
}
