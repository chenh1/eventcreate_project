import type { StringAsKeys, ToCamelCase } from "../utils/Generics";

export type CoreColors =
  "hyper-red" |
  "force-yellow" |
  "ultra-purple" |
  "cyber-teal" |
  "apex-blue" |
  "mach-indigo" |
  "night-black" |
  "night-black-300" |
  "max-white"

type CoreColorsObj = StringAsKeys<ToCamelCase<CoreColors, "-">, `#${string}`>

export const hyperRed: `#${string}` = '#FF2F97';
export const forceYellow: `#${string}` = '#FDD701';
export const ultraPurple: `#${string}` = '#FF31F3';
export const cyberTeal: `#${string}` = '#0BEFFE';
export const apexBlue: `#${string}` = '#41ABFF';
export const machIndigo: `#${string}` = '#AB46FF';
export const nightBlack: `#${string}` = '#050E1C';
export const nightBlack300: `#${string}` = '#272b4d';
export const maxWhite: `#${string}` = '#F3F4F6';

export const coreColors: `#${string}`[] = [
  hyperRed,
  forceYellow,
  ultraPurple,
  cyberTeal,
  apexBlue,
  machIndigo,
]

export const colorClasses: CoreColors[] = [
  'hyper-red',
  'force-yellow',
  'ultra-purple',
  'cyber-teal',
  'apex-blue',
  'mach-indigo',
]

const colorValues: CoreColorsObj = {
  hyperRed,
  forceYellow,
  ultraPurple,
  cyberTeal,
  apexBlue,
  machIndigo,
  nightBlack,
  nightBlack300,
  maxWhite,
}

export const getTextColorClass = (color: CoreColors): `text-${CoreColors}` | "" => {
  switch(color) {
    case 'ultra-purple':
      return 'text-ultra-purple';
    case 'hyper-red':
      return 'text-hyper-red';
    case 'force-yellow':
      return 'text-force-yellow';
    case 'apex-blue':
      return 'text-apex-blue';
    default:
      return '';
  }
}

export const getBorderColorClass = (color: CoreColors): `border-${CoreColors}` | "" => {
  switch(color) {
    case 'ultra-purple':
      return 'border-ultra-purple';
    case 'hyper-red':
      return 'border-hyper-red';
    case 'force-yellow':
      return 'border-force-yellow';
    case 'apex-blue':
      return 'border-apex-blue';
    default:
      return '';
  }
}

export default colorValues
