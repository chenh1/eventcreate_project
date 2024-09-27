import type { StringAsKeys } from "../utils/Generics";
import type { IncrementKeys } from "./types";

type IncrementsObj = StringAsKeys<IncrementKeys, number>

export const increments: IncrementsObj = {
  "0": 0,
  micro: 4, 
  xs: 8, 
  sm: 1, 
  md: 32, 
  lg: 48, 
  xl: 64, 
  separate: 80, 
  distinct: 128, 
}