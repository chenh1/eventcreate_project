"use client";

import type { FooterDataRes } from "@/graphql/queries/footer";
import React from "react"
import { useQuery, ApolloError } from "@apollo/client";
import { Section } from "../../containers/Section/Section";
import { Box } from "../../containers/Box/Box";
import { Heading } from "../../core/Heading/Heading";
import { SpanLink } from "../../core/SpanLink/SpanLink";
import Link from "next/link"
import { Divider } from "../../core/Divider/Divider";
import { Paragraph } from "../../core/Paragraph/Paragraph";
import { footerQuery } from "../../../graphql/queries/footer";
import { Markdown } from "../../utils/Markdown";
import { Brand } from "../../art/Brand/Brand";
//import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface FooterProps {
  brandContent?: React.ReactNode;
  bgColor?: `bg-${string}-${number}`
}

export const Footer: React.FC<FooterProps> = ({ brandContent, bgColor = 'bg-slate-400' }: FooterProps) => {
  const { 
    data,
    loading,
    error 
  }: { data: FooterDataRes | undefined; loading?: boolean; error?: ApolloError; } = useQuery(footerQuery);
  const footerData = data?.footer?.data?.attributes

  return (
    <div className={`relative ${bgColor} w-screen dark max-w-full`}>
      <Section>
        <Box padding="0" gap="lg" className="gap-12 xl:gap-40">
          <Box padding="0" gap="lg" className="xl:grid-cols-4 items-start">
            {brandContent ||
              <Box padding="0">
                <Link href="/">
                  <Brand mono/>
                </Link>
              </Box>
            }
            <Box padding="0" gap="lg" className="grid-cols-2 xl:grid-cols-3 xl:col-span-3 items-start">
              {footerData?.linkGroups?.map(({ title, link }, i) => {
                return (
                  <Box padding="0" gap="xs" key={i}>
                    <Paragraph className="font-bold">
                      {title}
                    </Paragraph>
                    <Divider className="max-w-[200px]" />
                    <ul className="flex flex-col">
                      {link.map(({ url, copy }, i) => (
                        <li key={i} className="inline mt-0 md:mt-2 ml-0">
                          <Link href={url}>
                            <SpanLink uncolored>
                              {copy}
                            </SpanLink>
                          </Link>
                        </li>  
                      ))}
                    </ul>
                  </Box>
                )
              })}
            </Box>
          </Box>
          <Box padding="0" gap="lg">
            <Divider/>
            <Markdown gap="sm" paragraphSize="sm">
              {footerData?.disclaimer ? [footerData?.disclaimer] : []}
            </Markdown>
          </Box>
        </Box>
      </Section>
    </div>
  )
}