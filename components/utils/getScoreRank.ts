//ranks
export const BRONZE = 'bronze'
export const SILVER = 'silver'
export const GOLD = 'gold'
export const PLATINUM = 'platinum'

export type Rank = typeof BRONZE | typeof SILVER | typeof GOLD |typeof PLATINUM

export const ranks: Rank[] = [BRONZE, SILVER, GOLD, PLATINUM]

export default (score: number | undefined): Rank => {
  if (typeof score === 'undefined') return BRONZE;

  let rank: Rank = BRONZE;

  switch(true) {
    case (score < 0.5):
      rank = BRONZE
      break;
    case (score < 0.75):
      rank = SILVER
      break;
    case (score < 1):
      rank = GOLD
      break;
    case (score === 1):
      rank = PLATINUM
      break;
  }

  return rank;
}