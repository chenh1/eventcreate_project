import fetch from 'node-fetch'

type SeoMetaDataRes = {
  title: string;
  description: string;
  referrer: string;
  keywords: string[];
  applicationName: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    url: `https://www.${string}.com/`;
    siteName: string;
    images: [
      {
        url: string;
        width: number;
        height: number;
        alt: string;
      }
    ],
    locale: 'en_US',
  }
} | {
  title: string;
}

export default async (reqUrl: string): Promise<SeoMetaDataRes> => {
  const res = await fetch(`${reqUrl}&populate=*`)
  const data = await res.json()
  const seoMetaData = data?.data?.[0]?.attributes?.seoMetaData;
  const { metaTitle: title, metaDescription: description, structuredData, keywords, metaImage } = seoMetaData || {}
  const { referrer } = structuredData || {}

  if (seoMetaData) {
    return { 
      title,
      description,
      referrer,
      keywords: keywords?.split(','),
      applicationName: "biz-web-client-demo",
      openGraph: {
        title,
        description,
        type: 'website',
        url: `https://www.biz-web-client-demo.com/`,
        siteName: "biz-web-client-demo",
        //authors: ['Seb', 'Josh'],
        images: [
          {
            url: metaImage?.url,
            width: metaImage?.width,
            height: metaImage?.height,
            alt: metaImage?.alternativeText
          }
        ],
        locale: 'en_US',
      },
    }
  }

  return {
    title: "biz-web-client-demo"
  }
}