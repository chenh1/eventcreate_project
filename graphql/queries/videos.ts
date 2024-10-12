import { gql, DocumentNode } from "@apollo/client";

export type VideoType = {
  title: string;
  url: string;
  description: string;
  transcript: string;
  lessonModule: number | string;
  tags: {
    data: {
      attributes: {
        displayName: string;
        color: string;
        value: string;
      }
    }[]
  }
}

export type Video = {
  attributes: VideoType;
}

export type VideoTypeResponse = {
  videos: {
    data: {
      attributes: VideoType
    }[]
  }
}

export const videosQuery: DocumentNode = gql`
  query Videos($firstModule: Float, $lastModule: Float) {
    videos(pagination: { page: 1, pageSize: 100 }, sort: "lessonModule:asc", filters: {lessonModule: {between: [ $firstModule, $lastModule ] }}) {
      data {
        attributes {
          title
          url
          description
          transcript
          lessonModule
          tags {
            data {
              attributes {
                displayName
                value
                color
              }
            }
          }
        }
      }
    }
  }
`