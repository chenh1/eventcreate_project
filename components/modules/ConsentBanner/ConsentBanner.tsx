"use client";

import React, { useState, useEffect, FC } from "react";
import { Section } from "../../containers/Section/Section";
import { Box } from "../../containers/Box/Box";
import { Button } from "../../core/Button/Button";
import { SpanLink } from "../../core/SpanLink/SpanLink";
import Link from "next/link";
import { Paragraph } from "../../core/Paragraph/Paragraph";
import { useCookies, Cookies } from "react-cookie";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export const CONSENT_COOKIE_NAME = "consent:accepted";

const rootPathsToRestrictAccess: string[] = ['/posts'];

export const ConsentBanner: FC = () => {
  const pathName = usePathname();
  const session = useSession();
  const [cookies, setCookie, removeCookie] = useCookies([CONSENT_COOKIE_NAME]);
  const [isReadyToShowBanner, setIsReadyToShowBanner] = useState<boolean>(false);
  const isRestrictedPage = rootPathsToRestrictAccess.some(path => pathName?.startsWith(path));

  useEffect(() => {
    if (typeof window !== 'undefined' && session?.status === 'unauthenticated') {
      setIsReadyToShowBanner(true);
    }
  }, [session?.status, pathName]);

  useEffect(() => {
    if (isRestrictedPage) {
      document.body.style.overflow = cookies[CONSENT_COOKIE_NAME] ? 'auto' : 'hidden';

      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [pathName, cookies[CONSENT_COOKIE_NAME], isRestrictedPage]);

  const hideBanner: boolean = !isReadyToShowBanner || !!cookies[CONSENT_COOKIE_NAME];

  return hideBanner ? null : (
    <>
      {isRestrictedPage && <div className="fixed top-0 w-screen h-screen z-50 bg-night-black opacity-25"></div>}
      <Section heightClass="py-12" className={`fixed bottom-0 ${isRestrictedPage ? 'h-1/2' : ''} w-screen bg-max-white z-50`}>
        <Box padding="0" gap="md" className="items-center sm:grid-cols-2">
          <Box padding="0" gap="sm">
            <Paragraph>We use cookies to enhance your user experience. By using our website, you agree to our use of cookies.</Paragraph>
            <Link href="/privacy-policy">
              <SpanLink uncolored>
                See our Privacy Policy
              </SpanLink>
            </Link>
          </Box>
          <Box padding="0" className="items-center">
            <Button onClick={() => setCookie(CONSENT_COOKIE_NAME, true)} primary label="Accept" size="lg" />
          </Box>
        </Box>
      </Section>
    </>
  );
};
