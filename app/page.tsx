import { getClient } from "./apollo/client";
import { Heading } from "../components/core/Heading/Heading";
import { Paragraph } from "../components/core/Paragraph/Paragraph";
import { Button } from "../components/core/Button/Button";
import { Box } from "../components/containers/Box/Box";
import { Section } from "../components/containers/Section/Section";
import { FlowerBloomGround } from "../components/art/FlowerBloomGround/FlowerBloomGround";
import { Fireflies } from "../components/art/Fireflies/Fireflies";
import { StepsToVictory } from "../components/art/StepsToVictory/StepsToVictory";
import homePageQuery from "../graphql/queries/homepage";
import { FadeIn } from "../components/animations/FadeIn/FadeIn";
import { ParallaxContainer } from "../components/animations/ParallaxContainer/ParallaxContainer";
import { UnderMaintenanceCatcher } from "../components/modules/UnderMaintenanceCatcher/UnderMaintenanceCatcher";
import getSeoMetaData from "../components/utils/getSeoMetaData";

export async function generateMetadata(
  { params, searchParams },
  parent
) {
  const reqUrl = `${process.env.API_URL}/api/static-page-seo-metadata?filters[pageName][$eq]=home`
  const seoMetaData = await getSeoMetaData(reqUrl)
  return seoMetaData;
}

export default async function Home() {
  const client = getClient();
  const { data, error } = await client.query({ query: homePageQuery });

  const {
    heroCopy,
    heroDescription,
    heroCta,
    step1,
    step2,
    step3,
    promo1Title,
    promo1Description,
    promo1Cta,
    promo2Title,
    promo2Description,
    promo2Cta,
    midwayTagline
  } = data.homePage.data.attributes || {};

  const promo2DescriptionNodes = promo2Description?.split('\n\n') || []
  const waterPipesBgUrl = `bg-[url('https://biz-web-client-demo-static.s3.us-east-2.amazonaws.com/water_pipes_3223d41574.png')]`

  return (
    <UnderMaintenanceCatcher error={error?.message}>
      <Section heightClass="h-screen" className="dark">
        <Fireflies className="bg-night-black"/>
        <Box padding="0" className="grid-cols-3 h-screen relative items-center">
          <Box padding="0" gap="lg" className="col-span-2 md:place-items-start md:max-w-[70vmin]">
            <Heading type="h1">{heroCopy}</Heading>
            <Heading type="h4">{heroDescription}</Heading>
            <Button data-cy="hero-cta" size="lg" label={heroCta?.copy} url={heroCta?.url} primary />
          </Box>
          <Box>
            <img src={`${process.env.STATIC_URL}/biz-web-client-demobloom_ce34764a74.png`} height="256" width="256" alt="biz-web-client-demo icon"/>
          </Box>
        </Box>
      </Section>

      <Section className="dark relative bg-gradient-to-b from-night-black to-indigo-700 z-10">
        <Box padding="0" className="grid-cols-3 justify-between">
          <Box padding="0" gap="md" className="place-content-between z-10">
            <Heading type="text-md md:text-4xl">{step1}</Heading>
            <Heading type="text-md md:text-4xl">{step3}</Heading>
          </Box>
          <Box padding="0" className="place-self-end">
            <StepsToVictory/>
          </Box>
          <Box padding="0" gap="md" className="place-content-center z-10">
            <Heading type="text-md md:text-4xl">{step2}</Heading>
          </Box>
        </Box>
        <ParallaxContainer offsetAmt={1000} parallaxAmount={0.03} className={`w-screen h-full absolute left-0 top-0`}>
          <div className={`w-[200vw] md:w-screen opacity-50 h-[200%] md:h-full bg-repeat-x -translate-y-[27%] -translate-x-1/4 md:translate-x-0 md:translate-y-0 scale-50 md:scale-100 ${waterPipesBgUrl}`}></div>
        </ParallaxContainer>
        <ParallaxContainer offsetAmt={1000} parallaxAmount={0.015} className={`w-[200vw] h-full absolute left-0 top-0`}>
          <div className={`w-[800vw] md:w-[200vw] opacity-50 h-[100%] md:h-full bg-repeat-x  -translate-x-1/2 md:-translate-x-1/4 md:translate-y-0 scale-[.25] md:scale-50 ${waterPipesBgUrl}`}></div>
        </ParallaxContainer>
      </Section>

      <Section fullBleed heightClass="pt-0 pb-24" className="bg-gradient-to-b from-indigo-700 to-night-black relative">
        <FlowerBloomGround/>
        <Box gap="sm" padding="0" className="md:absolute md:right-[10%] 2xl:right-[20%] top-8 md:p-4">
          <FadeIn disable={false} from="fromRight">
            <Box gap="sm" padding="0" className="dark md:max-w-[300px] md:p-4">
              <Heading type="h3">{midwayTagline}</Heading>
              <Button label={promo1Cta?.copy} url={promo1Cta?.url} primary size="lg"/>
            </Box>
          </FadeIn>
        </Box>
      </Section>

      <Section className="bg-max-white">
        <Box padding="0" className="md:justify-center md:place-items-center">
          <Heading type="h2">{promo1Title}</Heading>
          <Paragraph>{promo1Description}</Paragraph>
          <Button label={promo1Cta?.copy} url={promo1Cta?.url} primary size="lg"/>
        </Box>
      </Section>

      <Section className="bg-gradient-to-b from-night-black to-indigo-500">
        <Box padding="0" gap="md" className="grid-cols-5">
          <Box gap="md" hasShadow isRounded className="col-span-5 md:col-start-2 md:col-span-3 bg-max-white">
            <Heading type="h3">{promo2Title}</Heading>
            {promo2DescriptionNodes.map((node, index) => (
              <Paragraph key={index}>{node}</Paragraph>
            ))}
            <Box padding="0" className="self-center">
              <Button label={promo2Cta?.copy} url={promo2Cta?.url} primary size="lg"/>
            </Box>
          </Box>
        </Box>
      </Section>
    </UnderMaintenanceCatcher>
  )
}
