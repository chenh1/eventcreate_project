import { Section } from "../../components/containers/Section/Section";
import { Box } from "../../components/containers/Box/Box";
import { AdProvider } from "../../components/ads/AdProvider";
import postsTags from "../../components/ads/tags/posts";
import { PostsLayout } from "../../components/modules/PostsModules/PostsLayout";
import getSeoMetaData from "../../components/utils/getSeoMetaData";

export async function generateMetadata(
  { params, searchParams },
  parent
) {
  const reqUrl = `${process.env.API_URL}/api/static-page-seo-metadata?filters[pageName][$eq]=posts`
  const seoMetaData = await getSeoMetaData(reqUrl)
  return seoMetaData;
}

export default async function Posts(props) {
  return (
    <AdProvider tags={postsTags}>
      <Section addNavSpace className="min-h-screen ">
        <Box padding="0" gap="xl">
          <PostsLayout/>
        </Box>
      </Section>
    </AdProvider>
  )
}
