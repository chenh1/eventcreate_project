import { getClient } from "../../apollo/client";
import { Section } from "../../../components/containers/Section/Section";
import { Box } from "../../../components/containers/Box/Box";
import { Markdown } from "../../../components/utils/Markdown";
import { Heading } from "../../../components/core/Heading/Heading";
import { postBySlugQuery } from "../../../graphql/queries/postBySlug";
import { AdProvider } from "../../../components/ads/AdProvider";
import { AdContainer } from "../../../components/ads/AdContainer";
import postTags from '../../../components/ads/tags/post'
import { RecommendedPosts } from "../../../components/modules/RecommendedPosts/RecommendedPosts";

export async function generateMetadata(
  { params, searchParams },
  parent
) {
  
  const reqUrl = `${process.env.API_URL}/api/posts?filters[slug][$eq]=${params?.id}`
  
  const post = await fetch(reqUrl)
  const postData = await post.json()
  const metaData = postData?.data[0]?.attributes?.data?.metaData || {}
  const previewImage = postData?.data[0]?.attributes?.previewImage?.data?.attributes || {}
  const publishedAt = postData?.data[0]?.attributes?.publishedAt || {}

  if (metaData) {
    const { title, description, referrer, keywords, applicationName } = metaData
    return { 
      title,
      description,
      referrer,
      keywords,
      applicationName,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: publishedAt,
        url: `https://www.biz-web-client-demo.com/posts/${params?.id}`,
        siteName: "biz-web-client-demo",
        //authors: ['Seb', 'Josh'],
        images: [
          {
            url: previewImage?.url,
            width: previewImage?.width,
            height: previewImage?.height,
            alt: previewImage?.alternativeText
          }
        ],
        locale: 'en_US',
      },
    }
  }
  
  return {
    title: 'Latest Post',
  }
}

interface PostPageProps {
  params: {
    id: string
  }
}

export default async function Post({ params }: PostPageProps) {
  const client = getClient();
  const { data } = await client.query({ query: postBySlugQuery, variables: { slug: params?.id } });

  const {
    title,
    content,
    tags = []
  } = data?.posts?.data[0]?.attributes || {}
  const postId = data?.posts?.data[0]?.id;

  return (
    <AdProvider tags={postTags}>
      <Section addNavSpace className="min-h-screen bg-night-black dark">
        <Box padding="0" gap="distinct">
          <AdContainer align="center" elId="responsive-ad-top"/>
          <Box padding="0" gap="xl">
            <Heading type="h1">{title}</Heading>
            <Markdown gap="md">{content}</Markdown>
          </Box>
          <AdContainer align="center" elId="responsive-ad-bottom"/>

          <RecommendedPosts postId={postId} relatedTags={tags}/>
        </Box>
      </Section>
    </AdProvider>
  )
}