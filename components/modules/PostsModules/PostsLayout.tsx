'use client'

import type { PostType } from "@/graphql/queries/post";
import React, { useState } from "react"
import { useQuery } from "@apollo/client";
import { Box } from "../../containers/Box/Box";
import { postsQuery } from "../../../graphql/queries/posts";
import Link from "next/link";
import { Heading } from "../../core/Heading/Heading";
import { Pill } from "../../core/Pill/Pill";
import { Divider } from "../../core/Divider/Divider";
import { Hover3dCard } from "../../animations/Hover3dCard/Hover3dCard";
import { Paragraph } from "../../core/Paragraph/Paragraph";
import { PostsList } from "./PostsList";
//import { UnderMaintenanceCatcher } from "../UnderMaintenanceCatcher/UnderMaintenanceCatcher";
import { AdContainer } from "../../ads/AdContainer";
import { useFlippers } from "../../utils/useFlippers";
import { Loader } from "../Loader/Loader";

export const PostsLayout = () => {
  const [ page, setPage ] = useState<number>(1);
  const [ pageSize, setPageSize ] = useState<number>(12);
  const { testMode } = useFlippers({ key: 'testMode' });

  const { data: { posts: { data } = {} } = {}, loading: postsLoading, error: postsError, fetchMore } = useQuery(postsQuery, {
    variables: {
      page: page,
      pageSize: pageSize,
      sort: [ "createdAt:desc" ]
    }
  });

  const getNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMore({
      variables: {
        page: nextPage,
        pageSize: pageSize,
        sort: [ "createdAt:desc" ]
      }
    })
  }

  const posts: PostType[] = data?.filter(({ attributes: { tags } }) => {
    if (!testMode) {
      const isTestArticle = tags?.data?.some(({ attributes: { value } }) => value === 'testArticle')
      return !isTestArticle
    } else {
      return true
    }
  }) || []

  const featuredPost = posts?.[0]?.attributes
  const featuredPreviewImage = featuredPost?.previewImage?.data?.attributes;
  const { tags: featuredPostTags } = featuredPost || {};

  const secondaryPosts: PostType[] = posts?.slice(1, 5)
  const remainingPosts: PostType[] = posts?.slice(5)

  return (
    // <UnderMaintenanceCatcher error={(postsError || posts?.length === 0) && !postsLoading} noData>
    <>
      <AdContainer align="center" elId="responsive-ad-1"/>
      <Heading type="h1">Latest Posts</Heading>
      {postsLoading ?
        <Box padding="0" gap="md">
          <Loader/>
          <Heading className="text-center" type="h4">Sprouting up the latest headlines...</Heading>
        </Box>
        :
        <>
          {featuredPost &&
            <Link href={`posts/${featuredPost?.slug}`}>
              <Hover3dCard>
                <Box hasShadow isRounded className="grid-cols-1 sm:grid-cols-6 justify-center items-center hover:shadow-xl">
                  <Box padding="0" className="col-span-2">
                    {featuredPreviewImage && <img src={featuredPreviewImage?.url} width={featuredPreviewImage?.width} height={featuredPreviewImage?.height} alt={featuredPreviewImage?.alternativeText}/>}
                  </Box>
                  <Box padding="0" className="sm:col-span-4">
                    <Heading type="h2" className="text-lg font-semibold">{featuredPost?.title}</Heading>
                    <Paragraph size="sm" className="italic">{`Published ${new Date(featuredPost?.createdAt).toDateString()}`}</Paragraph>
                    <div>
                    {featuredPostTags?.data?.map(({ attributes: { value, displayName, color } }, i) => {
                      return (
                        <Pill key={i} color={color} className="text-x mr-2 mb-2">{displayName}</Pill>
                      )
                    })}
                    </div>
                  </Box>
                </Box>
              </Hover3dCard>
            </Link>
          }
          <Box padding="0" className="justify-center">
            <Box padding="0" className="w-[90vw] max-w-[1100px]">
              <Divider/>
            </Box>
          </Box>
          <Box padding="0" gap="sm" className="justify-center sm:grid-cols-4">
            {secondaryPosts?.map(({ id, attributes: { title, slug, previewImage, tags } }) => {
              const { url: imageUrl, width, height, alternativeText } = previewImage?.data?.attributes || {};

              return (
                <Link key={id} href={`posts/${slug}`}>
                  <Hover3dCard>
                    <Box hasShadow isRounded className="flex flex-col justify-center items-center hover:shadow-xl overflow-hidden min-h-[400px]">
                      <Box padding="0" className="-z-10 scale-[4] h-[200px] items-end relative">
                        <div className="absolute top-0 opacity-25 h-full w-full bg-night-black"></div>
                        <img src={imageUrl} width={width} height={height} alt={alternativeText}/>
                      </Box>
                      <Box className="absolute top-0 dark">
                        <Heading type="h3" className="text-lg font-semibold">{title}</Heading>
                      </Box>
                      <Box padding="0" className="items-end">
                        <div>
                        {tags?.data?.map(({ attributes: { value, displayName, color } }, i) => {
                          return (
                            <Pill key={i} color={color} className="text-x mr-2 mb-2">{displayName}</Pill>
                          )
                        })}
                        </div>
                      </Box>
                    </Box>
                  </Hover3dCard>
                </Link>
              )
            })}
          </Box>
          <Box padding="0" className="justify-center">
            <Box padding="0" className="w-[90vw] max-w-[1100px]">
              <Divider/>
            </Box>
          </Box>
          {remainingPosts?.length > 0 && <PostsList initialPosts={remainingPosts}/>}
        </>
      }
      <AdContainer align="center" elId="responsive-ad-2"/>
    </>
    // </UnderMaintenanceCatcher>
  )
}