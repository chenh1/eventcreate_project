import type { StringAsKeys, ToCamelCase } from "../utils/Generics";

export type Archetypes =
  "Essentialist" |
  "Researcher" |
  "Explorer" |
  "Pragmatist" |
  "Veteran" |
  "Adventurer" |
  "Enthusiast" |
  "Trailblazer" |
  "Scholar"

export type ArchetypeIcons = StringAsKeys<Archetypes, `${process.env["STATIC_URL"]}/${string}.png`>
export type ArchetypeDescriptions = StringAsKeys<Archetypes, string>

export const archetypeIcons: ArchetypeIcons = {
  "Essentialist": `${process.env.STATIC_URL}/essentialist_icon_5222a235be.png`,
  "Researcher": `${process.env.STATIC_URL}/researcher_icon_3e1d78a31d.png`,
  "Explorer": `${process.env.STATIC_URL}/explorer_icon_a6af9981d9.png`,
  "Pragmatist": `${process.env.STATIC_URL}/pragmatist_icon_8f2bc30acd.png`,
  "Veteran": `${process.env.STATIC_URL}/veteran_icon_32eeab4a62.png`,
  "Adventurer": `${process.env.STATIC_URL}/adventurer_icon_3d9b0355ab.png`,
  "Enthusiast": `${process.env.STATIC_URL}/enthusiast_icon_0d2cea9848.png`,
  "Trailblazer": `${process.env.STATIC_URL}/trailblazer_icon_c5c59dd9b3.png`,
  "Scholar": `${process.env.STATIC_URL}/scholar_icon_3fe61b50df.png`
}

export const archetypeDescriptions: ArchetypeDescriptions = {
  "Essentialist": "You are a minimalist. Let's get to the point and keep it low-effort.",
  "Researcher": "You want to start off studying the basics of all of the topics before diving in.",
  "Explorer": "You want to push the boundaries of your knowledge.",
  "Pragmatist": "You have some experience and you want to get into the details and practical strategies.",
  "Veteran": "You've been around the block and you want a refresher on some of the not-so-basics.",
  "Adventurer": "You've journeyed for a long time already and you want to see how far you've come.",
  "Enthusiast": "You've dabbled in options trading already and you definitely enjoy it.",
  "Trailblazer": "You're ready to go from start to finish and going past the limits of what you already know.",
  "Scholar": "Not a single topic is off-limits. You're ready to learn it all."
}