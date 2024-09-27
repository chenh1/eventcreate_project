/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    //API_URL: "http://127.0.0.1:1337"
    API_URL: process.env.API_URL || "http://127.0.0.1:1337",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    QUERY_OVERRIDE: process.env.QUERY_OVERRIDE,
    GTM_ID: process.env.GTM_ID,
  },
  images: {
    domains: [
      'storage.googleapis.com',
      'images.unsplash.com',
      'localhost',
      'biz-web-client-demo-static.s3.us-east-2.amazonaws.com',
      // 'biz-client.com'
    ],
  }
}

module.exports = nextConfig
