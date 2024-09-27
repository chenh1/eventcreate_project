import type { IncrementKeys } from "../constants/types"

export default (gap: IncrementKeys): `gap-${number}` => {
  switch(gap) {
    case 'micro': {
      return 'gap-1'
    }
    case 'xs': {
      return 'gap-2'
    }
    case 'sm': {
      return 'gap-4'
    }
    case 'md': {
      return 'gap-8'
    }
    case 'lg': {
      return 'gap-12'
    }
    case 'xl': {
      return 'gap-16'
    }
    case 'separate': {
      return 'gap-20'
    }
    case 'distinct': {
      return 'gap-32'
    }
  }

  return 'gap-4'
}