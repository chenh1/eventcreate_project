import './globals.css'
import '../dist/style.css'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from './apollo/apollo-provider'
import { Header } from '../components/modules/Header/Header'
import { Footer } from '../components/modules/Footer/Footer'
import AuthProvider from '../components/utils/AuthProvider'
import Script from "next/script"
import { PageTransition } from '../components/animations/PageTransition/PageTransition'
import { ConsentBanner } from '../components/modules/ConsentBanner/ConsentBanner'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children, ...rest }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://biz-web-client-demo-static.s3.us-east-2.amazonaws.com" />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script 
          strategy="beforeInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=G-HS9JY3837Y`}
        />
        <Script strategy="afterInteractive" id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-HS9JY3837Y');
          `}
        </Script>
        {/* <!-- Google Tag Manager --> */}
        <Script strategy="afterInteractive" id="google-tag-manager">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-W7LRW7DQ');`}</Script>
        {/* <!-- End Google Tag Manager --> */}
      </head>
      <body className={inter.className}>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W7LRW7DQ" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <ApolloWrapper>
          <AuthProvider>
            <main className="flex flex-col items-center overflow-x-hidden">
              <PageTransition/>
              <Header />
              {children}
              <Footer />
              <ConsentBanner/>
            </main>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
