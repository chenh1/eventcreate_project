export type ToCamelCase<Str, Separator extends string> =
  Str extends `${infer First}${Separator}${infer Rest}`
    ? `${First}${ToCamelCase<Capitalize<Rest>, Separator>}`
    : Str
  
export type StringAsKeys<Str extends string, ValueType> = {
  [Key in Str]: ValueType
}