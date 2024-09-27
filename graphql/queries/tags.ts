import { gql, DocumentNode } from "@apollo/client";
import { CoreColors } from "@/components/constants/colors";

export type TagType = {
  displayName: string;
  value: string;
  clientFacing: boolean;
  color: CoreColors;
}

export type TagRes = {
  data: {
    attributes: TagType
  }[]
}

export const tagsQuery: DocumentNode = gql`
  query Tags {
    tags(pagination: { pageSize: 1000 }) {
      data {
        attributes {
          displayName
          value
          clientFacing
          color
        }
      }
    }
  }
`