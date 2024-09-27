export type AdTags = {
  elId: string,
  path: `/${number}/${string}`,
  isResponsive: boolean,
  slots: number[][],
  isIterative?: boolean
}[]