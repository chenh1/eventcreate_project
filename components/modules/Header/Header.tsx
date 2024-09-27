"use client";

import type { HeaderDataRes } from "../../../graphql/queries/header";
import type { BgColor, DarkBgColor } from "../../containers/FixedDrawer/FixedDrawer";
import React, { useState } from "react"
import { FixedDrawer } from "../../containers/FixedDrawer/FixedDrawer";
import { Section } from "../../containers/Section/Section";
import { Box } from "../../containers/Box/Box";
import { Heading } from "../../core/Heading/Heading";
import { Button } from "../../core/Button/Button";
import { SpanLink } from "../../core/SpanLink/SpanLink";
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation";
import { LoginForm } from "../LoginForm/LoginForm";
import { Overlay } from "../../containers/Overlay/Overlay";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Paragraph } from "../../core/Paragraph/Paragraph";
import { Profile } from "../../modules/Profile/Profile";
import { headerQuery } from "../../../graphql/queries/header";
import { useQuery, ApolloError } from "@apollo/client";
import { useFlippers } from "../../utils/useFlippers";
import { Brand } from "../../art/Brand/Brand";

const pathsWithLightBg: string[] = [
  '/reset-password',
  '/posts'
]

interface HeaderProps {
  headerContent?: React.ReactNode;
  isTransparent?: boolean;
  bgColor?: BgColor;
  darkBgColor?: DarkBgColor;
  hasShadow?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ headerContent, isTransparent, bgColor = "max-white", darkBgColor = "night-black", hasShadow = true }: HeaderProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams()
  const queryOverride = searchParams?.get('overridemaintenancemode')?.toLowerCase()
  const isOverriding = queryOverride === process.env.QUERY_OVERRIDE
  const [ showMobileNav, setShowMobileNav ] = useState<boolean>(false);
  const [ isLoggingIn, setIsLoggingIn ] = useState<boolean>(false);
  const [ isLoggingOut, setIsLoggingOut ] = useState<boolean>(false);
  const [ isAtTop, setIsAtTop ] = useState<boolean>(true);

  const session = useSession()
  const isOnPageWithLightBg = pathsWithLightBg.includes(pathName ?? '')

  const { 
    data,
    loading, 
    error 
  }: { data: HeaderDataRes | undefined; loading?: boolean; error?: ApolloError; } = useQuery(headerQuery);
  const navLinks = data?.header?.data?.attributes?.navLinks
  const { maintenanceMode } = useFlippers({ key: 'maintenanceMode' });

  return (
    <>
      <FixedDrawer 
        hasScroll 
        bgColor={isTransparent || isAtTop ? "bg-transparent" : bgColor} 
        darkBgColor={isTransparent ? "bg-transparent" : darkBgColor} 
        hasShadow={hasShadow && !isAtTop} 
        openFrom="top" 
        hasTab={false} 
        hasSensors={false} 
        onTopReached={() => setIsAtTop(true)}
        onTopLeave={() => setIsAtTop(false)}
        padding="0"
        shouldDisableBodyScroll={false}
        className={`px-0 py-1 w-screen duration-300 ease-in-out ${isAtTop && !isOnPageWithLightBg ? 'dark' : ''} ${showMobileNav ? "min-h-full md:min-h-[56px]" : "min-h-[56px]"}`}
        defaultOpenState={true}
      >
        <Section heightClass="py-1">
          <Box padding="0" className="grid-cols-2">
            {headerContent ||
              <Link href="/">
                <Brand/>
              </Link>
            }
            <div onClick={() => setShowMobileNav(!showMobileNav)} className="md:hidden cursor-pointer flex flex-col max-w-min justify-center justify-self-end">
              <div className={`${showMobileNav ? "animate-hamburgertochevronleft" : "animate-hamburgertochevronleftreverse "} border-night-black dark:border-max-white border-2 w-6`} />
              <div className={`${showMobileNav ? "animate-hamburgertochevronright" : "animate-hamburgertochevronrightreverse "} border-night-black dark:border-max-white border-2 w-6 mt-2`} />
            </div>
            <nav className={`col-span-2 md:col-span-1 duration-300 ease-in-out ${showMobileNav ? `flex h-full bg-${bgColor || 'transparent'} dark:bg-${darkBgColor || 'transparent'}`  : 'hidden h-0 md:flex md:h-full'} md:flex items-center justify-end`}>
              <ul className="flex flex-col md:flex-row items-center justify-end">
                {navLinks?.map(({ copy, url }, i) => (
                  <li key={i} className="inline mt-8 ml-12 md:mt-0">
                    <Link data-cy={`nav-link-${copy?.replace(' ', '-')?.toLowerCase()}`} href={url}>
                      <SpanLink uncolored>
                        {copy}
                      </SpanLink>
                    </Link>
                  </li>  
                ))}
                {(!maintenanceMode || isOverriding) &&
                  <li className="inline mt-8 ml-12 md:mt-0">
                    {
                      session?.status === "authenticated" ?
                        <Profile setIsLoggingOut={setIsLoggingOut}/>
                        :
                        <a data-cy="header-login-link" onClick={()=> setIsLoggingIn(!isLoggingIn)}>
                          <SpanLink uncolored>Login</SpanLink>
                        </a>
                    }
                  </li>
                }
              </ul>
            </nav>
          </Box>
        </Section>
      </FixedDrawer>
      
      {isLoggingIn &&
        <Overlay wrapperClassName="px-4 w-full sm:w-auto" visibility={isLoggingIn} toggleVisibility={setIsLoggingIn}>
          <LoginForm defaultIsRegistering={false} toggleVisibility={setIsLoggingIn}/>
        </Overlay>
      }

      {isLoggingOut &&
        <Overlay wrapperClassName="px-4 w-full sm:w-auto" visibility={isLoggingOut} toggleVisibility={setIsLoggingOut}>
          <Box padding="0" gap="md">
            <Heading type="h4" className="text-center">Logout</Heading>
            <Paragraph className="text-center">Are you sure you want to logout?</Paragraph>
            <Box padding="0" gap="md" className="grid-cols-[auto_auto]">
              <Button onClick={() => setIsLoggingOut(false)} label={"Cancel"} />
              <Button onClick={() => signOut()} label={"Logout"} primary />
            </Box>
          </Box>
        </Overlay>
      }
    </>
  )
}