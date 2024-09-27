import { Section } from "../../components/containers/Section/Section";
import { Box } from "../../components/containers/Box/Box";
import { Heading } from "../../components/core/Heading/Heading";
import { ResetPasswordForm } from "../../components/modules/ResetPasswordForm/ResetPasswordForm";
import getSeoMetaData from "../../components/utils/getSeoMetaData";

export async function generateMetadata(
  { params, searchParams },
  parent
) {
  const reqUrl = `${process.env.API_URL}/api/static-page-seo-metadata?filters[pageName][$eq]=reset-password`
  const seoMetaData = await getSeoMetaData(reqUrl)
  return seoMetaData;
}

export default function ResetPassword(props) {
  return (
    <Section addNavSpace className="min-h-screen ">
      <Box padding="0" gap="lg">
        <Heading type="h1">Reset Password</Heading>
        <ResetPasswordForm/>
      </Box>
    </Section>
  )
}
