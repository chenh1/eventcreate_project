import type { IncrementKeys } from "../constants/types"

export default (size: IncrementKeys): number => {
  switch(size) {
    case 'micro': {
      return 1
    }
    case 'xs': {
      return 2
    }
    case 'sm': {
      return 4
    }
    case 'md': {
      return 8
    }
    case 'lg': {
      return 12
    }
    case 'xl': {
      return 16
    }
    case 'separate': {
      return 20
    }
    case 'distinct': {
      return 32
    }
  }

  return 0
}