'use client'

import type { PostType } from "@/graphql/queries/post";
import type { TagRes } from "@/graphql/queries/tags";
import React from "react"
import { useQuery } from "@apollo/client";
import { postsQuery } from "../../../graphql/queries/posts";
import { Box } from "../../containers/Box/Box";
import Link from "next/link";
import { Heading } from "../../core/Heading/Heading";
import { Pill } from "../../core/Pill/Pill";
import { Button } from "../../core/Button/Button";
import { Hover3dCard } from "../../animations/Hover3dCard/Hover3dCard";
import { useFlippers } from "../../utils/useFlippers";

interface RecommendedPostsProps {
  postId: string;
  relatedTags: TagRes
}

export const RecommendedPosts: React.FC<RecommendedPostsProps> = ({ postId, relatedTags }: RecommendedPostsProps) => {
  const { data: { posts: { data: posts } = {} } = {} } = useQuery(postsQuery, {
    variables: { 
      page: 1,
      pageSize: 20,
      ne: postId,
      in: relatedTags?.data?.map(({ attributes: { value } }) => value),
    }
  });

  const { testMode } = useFlippers({ key: 'testMode' });
  console.log("posts ", posts)
  const recommendedPosts: PostType[] = posts?.filter(({ attributes: { tags } }) => {
    if (!testMode) {
      const isTestArticle = tags?.data?.some(({ attributes: { value } }) => value === 'testArticle')
      return !isTestArticle
    } else {
      return true
    }
  })?.slice(0, 4)

  return (
    <Box padding="0" gap="md">
      {recommendedPosts?.length > 0 &&
        <>
          <Heading type="h2">Recommended Posts</Heading>
          <Box padding="0" gap="sm" className="sm:grid-cols-4">
            {recommendedPosts?.map(({ id, attributes: { title: rawTitle, slug, previewImage, tags } }) => {
              const { url: imageUrl, width, height, alternativeText } = previewImage?.data?.attributes || {};
              const title = rawTitle?.length >= 50 ? `${rawTitle?.slice(0, 50)}...` : rawTitle;

              return (
                <Link key={id} href={`${slug}`}>
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
        </>
      }
      <Box padding="0" className={recommendedPosts?.length > 0 ? `sm:justify-self-end` : 'sm:justify-self-center'}>
        {recommendedPosts?.length === 0 && <Heading type="h2">See latest posts here</Heading>}
        <Button primary label={recommendedPosts?.length > 0 ? "See more posts" : "See all posts"} url="/posts"/>
      </Box>
    </Box>
  )
}