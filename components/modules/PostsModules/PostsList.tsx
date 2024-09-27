'use client'

import type { PostType } from "@/graphql/queries/post";
import React, { useEffect, useState, useRef } from "react"
import { useLazyQuery, useQuery } from "@apollo/client";
import { tagsQuery } from "../../../graphql/queries/tags";
import { postsQuery } from "../../../graphql/queries/posts";
import { Dropdown } from "../../fields/Dropdown/Dropdown";
import { Box } from "../../containers/Box/Box";
import Link from "next/link";
import { Heading } from "../../core/Heading/Heading";
import { Paragraph } from "../../core/Paragraph/Paragraph";
import { Pill } from "../../core/Pill/Pill";
import { Button } from "../../core/Button/Button";
import { useFlippers } from "../../utils/useFlippers";

const sortOptions: { isPlaceholder?: boolean; label: string; value: `createdAt:${"desc" | "asc"}`}[] = [
  { isPlaceholder: true, label: "Sort by", value: "createdAt:desc" },
  { label: "Newest", value: "createdAt:desc" },
  { label: "Oldest", value: "createdAt:asc" }
]

interface PostsListProps {
  initialPosts: PostType[]
}

export const PostsList: React.FC<PostsListProps> = ({ initialPosts = [] }: PostsListProps) => {
  const [ page, setPage ] = useState<number>(1);
  const [ totalPosts, setTotalPosts ] = useState<PostType[]>(initialPosts)
  const totalPostsRef = useRef<PostType[]>(totalPosts)
  const updateTotalPosts = (newPosts) => {
    totalPostsRef.current = newPosts
    setTotalPosts(newPosts)
  }

  const { testMode } = useFlippers({ key: 'testMode' });

  // fetch available tags for filters
  const [ selectedTags, setSelectedTags ] = useState<string[]>([]);
  const [ sortBy, setSortBy ] = useState("createdAt:desc");
  const { data: { tags: { data: dataTagsRaw = [] } = {} } = {}, loading: tagsLoading, error: tagsError } = useQuery(tagsQuery);
  // filter out testArticle tags
  const dataTags = dataTagsRaw?.filter(({ attributes: { clientFacing } }) => !!clientFacing)

  // fetch posts
  const [fetchPosts, { data: { posts: { data: dataPosts = [] } = {} } = {}, loading: postsLoading, error: postsError, fetchMore }] = useLazyQuery(postsQuery)

  const startNewPosts = async () => {
    const newPosts = await fetchPosts({
      variables: {
        page: 1,
        pageSize: 2,
        in: selectedTags,
        sort: [ sortBy ]
      }
    })
    updateTotalPosts(newPosts?.data?.posts?.data)
  }
  
  const getNextPage = async () => {
    const nextPage = await fetchMore({
      variables: {
        page: page,
        pageSize: 2,
        in: selectedTags,
        sort: [ sortBy ]
      }
    })
    updateTotalPosts([...totalPosts, ...nextPage?.data?.posts?.data])
  }

  useEffect(() => {
    setPage(1)
    startNewPosts()
  }, [selectedTags, sortBy])

  useEffect(() => {
    getNextPage()
  }, [page])

  let posts = totalPostsRef?.current?.length > 0 ? totalPostsRef.current : initialPosts;
  posts = [...(posts || [])]
    .filter(({ attributes: { tags } = {} }) => {
      if (!testMode) {
        const isTestArticle = tags?.data?.some(({ attributes: { value } }) => value === 'testArticle')
        return !isTestArticle
      } else {
        return true
      }
    })
    .sort((a, b) => {
      const aDate = new Date(a?.attributes?.createdAt)
      const bDate = new Date(b?.attributes?.createdAt)
      return sortBy === "createdAt:desc" ? bDate.getTime() - aDate.getTime() : aDate.getTime() - bDate.getTime()
    })

  const filteredTags = [
    { attributes: { isPlaceholder: true, value: "default", displayName: "Select filters" } },
    ...dataTags?.filter(({ attributes: { value } }) => !selectedTags.includes(value))
  ]

  return (
    <Box padding="0" gap="sm">
      <Box padding="0" gap="sm">
        <Box padding="0" gap="sm" className="grid-cols-[max-content_max-content]">
          <Dropdown
            useLabelPlaceholder
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTags([...selectedTags, e.target.value])}
            options={filteredTags?.map(({ attributes: { isPlaceholder, displayName, value } }) => {
              return {
                isPlaceholder,
                label: displayName,
                value: value
              }
            })}
          />
          <Dropdown
            useLabelPlaceholder
            onChange={(e) => setSortBy(e.target.value)}
            options={sortOptions}
          />
        </Box>
        <div className="flex justify-start items-start min-h-[48px]">
          {selectedTags?.map((tag, i) => {
            const label = dataTags?.find(({ attributes: { value } }) => value === tag)?.attributes?.displayName
            const color = dataTags?.find(({ attributes: { value } }) => value === tag)?.attributes?.color
            return (
              <Pill 
                key={i} 
                color={color} 
                className="mr-2 mb-1"
                onClick={() => {
                  setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag))
                }}
              >
                {label}
              </Pill>
            )
          })}
        </div>
      </Box>

      <Box padding="0" gap="md" className="justify-start">
        {posts?.map(({ id, attributes: { title, slug, previewImage, tags, createdAt } = {} }) => {
          return (
            <Link key={id} href={`posts/${slug}`}>
              <Box padding="0" gap="micro">
                <Heading type="h4" className="text-lg font-semibold">{title}</Heading>
                <Paragraph size="sm" className="italic">{`Published ${new Date(createdAt ?? '')?.toDateString() || ''}`}</Paragraph>
                <Box padding="0" className="items-end">
                  <div>
                    {tags?.data?.map(({ attributes: { value, displayName, color } }, i) => {
                      return (
                        <Pill key={i} color={color} className="mr-2 mb-2">{displayName}</Pill>
                      )
                    })}
                  </div>
                </Box>
              </Box>
            </Link>
          )
        })}
        <div className="sm:max-w-[200px]">
          <Button primary disabled={postsLoading} label="Load more" onClick={() => setPage(page + 1)}/>
        </div>
      </Box>
    </Box>
  )
}