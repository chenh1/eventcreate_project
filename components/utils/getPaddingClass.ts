import type { IncrementKeys, PaddingValues } from "../constants/types";

const getPaddingClass = (padding: IncrementKeys): PaddingValues => {
  switch (padding) {
    case 'micro':
      return 'p-1';
    case 'xs':
      return 'p-2';
    case 'sm':
      return 'p-4';
    case 'md':
      return 'p-8';
    case 'lg':
      return 'p-12';
    case 'xl':
      return 'p-16';
    case "0":
      return 'p-0';
    default:
      return 'p-0';
  }
};

export default getPaddingClass