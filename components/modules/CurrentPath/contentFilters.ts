import type { Archetypes } from "../../constants/archetypes";
import type { VideoType } from "../../../graphql/queries/videos";

interface ArchetypeAttributes {
  risk: number; 
  experience: number; 
  patience: number; 
  willingness: number;
}

export type UserProfile = ArchetypeAttributes & {
  archetype: Archetypes | undefined;
}


const filterByTagConditions = (videos: { attributes: VideoType }[], condition: (any) => boolean) => {
  return videos?.filter(({ attributes }) => {
    const { tags: tagsData } = attributes
    const attributesSet = tagsData?.data
    const tags = attributesSet?.map(({ attributes: { value } }) => value)
    return condition(tags)
  })
}

export const filterVideos = (videos: { attributes: VideoType }[], userProfile: UserProfile): { attributes: VideoType }[] => {
  const { archetype } = userProfile
  let filtered = [...videos]

  switch (archetype) {
    // only novice  
    case "Essentialist":
      filtered = filterByTagConditions(videos, tags => tags.includes('novice'))
    //All intro only, risk averse and risk moderate, all series
    case "Researcher":
      filtered = filterByTagConditions(videos, tags => tags.includes('introductory') && (tags.includes('risk_averse') || tags.includes('risk_moderate')))
    //All intro and details, risk averse and risk moderate, all series
    case "Explorer":
      filtered = filterByTagConditions(videos, tags => (tags.includes('introductory') || tags.includes('details')) && (tags.includes('risk_averse') || tags.includes('risk_moderate')))
    //All details and additional, series 2-5
    case "Pragmatist":
      filtered = filterByTagConditions(videos, tags => (tags.includes('details') || tags.includes('additional')) && (tags.includes('risk_averse') || tags.includes('risk_moderate')) && !tags.includes("novice"))
    //All details and additional, risk averse and risk moderate, series 4 & 5
    case "Veteran":
      filtered = filterByTagConditions(videos, tags => (tags.includes('details') || tags.includes('additional')) && (tags.includes('risk_averse') || tags.includes('risk_moderate')) && !tags.includes("novice") && !tags.includes("beginner") && !tags.includes("intermediate"))
    //All details and additional, series 4 & 5
    case "Adventurer":
      filtered = filterByTagConditions(videos, tags => (tags.includes('details') || tags.includes('additional')) && !tags.includes("novice") && !tags.includes("beginner") && !tags.includes("intermediate"))
    //Series 3-5
    case "Enthusiast":
      filtered = filterByTagConditions(videos, tags => !tags.includes("novice") && !tags.includes("beginner"))
    //All intro and details and additional, risk averse and risk moderate, all series
    case "Trailblazer":
      filtered = filterByTagConditions(videos, tags => (tags.includes('introductory') || tags.includes('details') || tags.includes('additional')) && (tags.includes('risk_averse') || tags.includes('risk_moderate')))
    //All videos
    case "Scholar":
      filtered = [...videos]
  }

  return filtered;
}

export const getArchetype = ({ risk, experience, patience, willingness }: ArchetypeAttributes): Archetypes => {
  // only novice
  if (risk === 1 && experience === 1 && (patience <= 3 || willingness <= 3)) {
    return "Essentialist"
  }

  //All intro only, risk averse and risk moderate, all series
  if (risk <= 2 && experience === 1 && (patience <= 4 || willingness <= 4)) {
    return "Researcher"
  }

  //All intro and details, risk averse and risk moderate, all series
  if (risk <= 2 && experience === 1 && (patience <= 5 || willingness <= 5)) {
    return "Explorer"
  }

  //All details and additional, series 2-5
  if (
    (experience === 2 && (patience <= 3 || willingness <= 3)) ||
    (experience === 3 && (patience <= 4 || willingness <= 4))
  ) {
    return "Pragmatist"
  }

  //All details and additional, risk averse and risk moderate, series 4 & 5
  if (risk <= 2 && experience === 4 && (patience <= 4 || willingness <= 4)) {
    return "Veteran"
  }

  //All details and additional, series 4 & 5
  if (risk === 3 && experience === 4 && (patience <= 4 || willingness <= 4)) {
    return "Adventurer"
  }

  //Series 3-5
  if (experience === 4 && (patience > 4 || willingness > 4)) {
    return "Enthusiast"
  }

  //All intro and details and additional, risk averse and risk moderate, all series
  if (risk === 1 && experience === 1 && (patience > 5 || willingness > 5)) {
    return "Trailblazer"
  }

  //All videos
  if (risk >= 2 && experience <= 2 && (patience > 5 || willingness > 5)) {
    return "Scholar"
  }

  return "Scholar"
}