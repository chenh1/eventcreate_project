import { getClient } from "../../apollo/client";
import { Section } from "../../../components/containers/Section/Section";
import { Deck } from "../../../components/modules/Deck/Deck";
import { examQuestionsQuery } from "../../../graphql/queries/examQuestions";
import { learningPathsQuery } from "../../../graphql/queries/learningPaths";
import { videosQuery } from "../../../graphql/queries/videos";
import { masterPathQuery } from "../../../graphql/queries/masterPath";
import { FixedDrawer } from "../../../components/containers/FixedDrawer/FixedDrawer";
import { Heading } from "../../../components/core/Heading/Heading";

import dynamic from 'next/dynamic'

export async function generateMetadata(
  { params, searchParams },
  parent
) {
  const moduleId = params?.id?.replace('-', '.')
  const reqUrl = `${process.env.API_URL}/api/videos?filters[lessonModule][$eq]=${moduleId}`
  
  const module = await fetch(reqUrl)
  const moduleData = await module.json()
  const { title, description } = moduleData?.data[0]?.attributes || {}

  if (moduleData) {
    return { 
      title,
      description,
      //referrer,
      keywords: [],
      applicationName: "biz-web-client-demo",
      openGraph: {
        title,
        description,
        type: 'website',
        //publishedTime: publishedAt,
        url: `https://www.biz-web-client-demo.com/module/${params?.id}`,
        siteName: "biz-web-client-demo",
        //authors: ['Seb', 'Josh'],
        images: [
          {
            url: "https://biz-web-client-demo-static.s3.us-east-2.amazonaws.com/biz-web-client-demobloommono_ba249abb01.png",
            width: 256,
            height: 256,
            alt: "biz-web-client-demo Logo"
          }
        ],
        locale: 'en_US',
      },
    }
  }
  
  return {
    title: 'Latest Module',
  }
}

const SideViewInModules = dynamic(async () => {
  const { SideViewInModules } = await import("../../../components/modules/SideViewInModules/SideViewInModules")
  return { default: SideViewInModules }
}, {
  loading: () => <div>Loading...</div>,
  ssr: false,
})

interface ModulePageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params, ...rest }: ModulePageProps) {
  const { id } = params || {}; // id format is "[lesson number]-[lesson module with one leading zero if single digit]", e.g. "1-01"
  const lessonModule = parseFloat(id.replace('.', 'break').replace('-', '.'));
  const firstModule = Math.floor(lessonModule);
  const lastModule = firstModule + 0.999;
  const client = getClient();

  const data = await Promise.all([
    client.query({ query: examQuestionsQuery, variables: { lessonModule } }),
    client.query({ query: videosQuery, variables: { firstModule, lastModule } }),
    client.query({ query: learningPathsQuery, variables: { level: firstModule } }),
    client.query({ query: masterPathQuery }),
  ]);

  const examQuestions = data[0]?.data?.examQuestions?.data || [];
  const videos = data[1]?.data?.videos?.data || [];
  const learningPaths = data[2]?.data?.learningPaths?.data || [];
  const orderedPathArray = data[3]?.data?.masterPath?.data?.attributes?.orderedPathArray || [];

  const video = videos?.filter(video => video.attributes.lessonModule === lessonModule)?.[0]?.attributes || {};
  const availableModules = videos?.map(video => video.attributes) || [];
  const learningPath = learningPaths?.[0]?.attributes || {};

  return (
    <Section heightClass="pt-0 pb-10" className="min-h-screen bg-night-black dark">
      <Deck video={video} questions={examQuestions} lessonModule={lessonModule} lessonModuleId={id} orderedPathArray={orderedPathArray}/>
      <FixedDrawer 
        hasClickOutArea
        openFrom="right" 
        className="h-screen top-0" 
        tabClasses="bottom-2 p-1"
        tabIsFixed
        padding="0"
        tabContent={
          <div className="w-14 h-14 rounded-full bg-apex-blue relative grid place-items-center after:content-[''] after:absolute after:w-14 after:h-14 after:rounded-full after:-z-10 after:bg-cyber-teal after:animate-pulseEffect">
            <div className="w-12 h-12 rounded-full bg-cyber-teal grid place-items-center">
              <div className="w-10 h-10 rounded-full bg-apex-blue grid place-items-center">
                <Heading type="h4">{lessonModule}</Heading>
              </div>
            </div>
          </div>
        }
      >
        <SideViewInModules
          isVertical
          lessonModule={lessonModule}
          availableModules={availableModules}
          rawTree={learningPath.rawTree}
        />
      </FixedDrawer>
    </Section>
  )
}
