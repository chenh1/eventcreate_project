import React from "react";
import { Section } from "../../components/containers/Section/Section";
import { getClient } from "../apollo/client";
import aboutPageQuery from "../../graphql/queries/aboutpage";
import { Heading } from "../../components/core/Heading/Heading";
import { Markdown } from "../../components/utils/Markdown";
import { Box } from "../../components/containers/Box/Box";
import { ParallaxContainer } from "../../components/animations/ParallaxContainer/ParallaxContainer";
import { UnderMaintenanceCatcher } from "../../components/modules/UnderMaintenanceCatcher/UnderMaintenanceCatcher";
import getSeoMetaData from "../../components/utils/getSeoMetaData";

export async function generateMetadata(
  { params, searchParams },
  parent
) {
  const reqUrl = `${process.env.API_URL}/api/static-page-seo-metadata?filters[pageName][$eq]=about`
  const seoMetaData = await getSeoMetaData(reqUrl)
  return seoMetaData;
}

export default async function About(props) {
  const client = getClient();
  const { error, data: { aboutPage: { data: { attributes: aboutPage = {} } = {} } = {} } = {} } = await client.query({ query: aboutPageQuery });
  const { url , height, width, alternativeText } = aboutPage?.topImage?.data?.attributes || {};

  return (
    <UnderMaintenanceCatcher error={error?.message}>
      <Section addNavSpace className="min-h-screen bg-night-black dark">
        <Box gap="xs" padding="0">
          <Box padding="0" className="grid-cols-2 items-center">
            <Heading type="h1">{aboutPage?.title}</Heading>
            <ParallaxContainer parallaxAmount={.05} offsetAmt={100}>
              <img className="animate-spin" src={"https://biz-web-client-demo-static.s3.us-east-2.amazonaws.com/biz-web-client-demobloommono_ba249abb01.png"} width={width / 2} height={height / 2} alt={alternativeText}/>
            </ParallaxContainer>
          </Box>
          <Markdown gap="md">{aboutPage?.content}</Markdown>
        </Box>
      </Section>
    </UnderMaintenanceCatcher>
  )
}
