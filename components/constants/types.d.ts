import React from "react";
import type { Session } from "next-auth";
import type { SessionContextValue } from "next-auth/react";

export type Orientation = "horizontal" | "vertical"

export type AnimationBase = {
  className?: string,
  disable: boolean, 
  animateWhenInView?: boolean
  children?: string | JSX.Element | JSX.Element[] | null
}

export type IncrementKeys = 
  "micro" |
  "xs" |
  "sm" |
  "md" |
  "lg" |
  "xl" |
  "separate" |
  "distinct" |
  "0"

export type GapValues = 
  "gap-1" |
  "gap-2" |
  "gap-4" |
  "gap-8" |
  "gap-12" |
  "gap-16" |
  "gap-20" |
  "gap-32"

export type PaddingValues =
  "p-1" |
  "p-2" |
  "p-4" |
  "p-8" |
  "p-12" |
  "p-16"

export type Coords = {
  x: number;
  y: number;
}

export type SessionWithJwt<R extends boolean = false> = R extends true
?
    | { update: UpdateSession; data: Session & { jwt?: string, email?: string }; status: "authenticated" }
    | { update: UpdateSession; data: null; status: "loading" }
:
    | { update: UpdateSession; data: Session & { jwt?: string, email?: string }; status: "authenticated" }
    | {
        update: UpdateSession
        data: null
        status: "unauthenticated" | "loading"
      }
      
export type Direction = 'left' | 'right' | 'top' | 'bottom';
export type FromDirection =  `from${Capitalize<Direction>}`

export type UserFormSubmitValues = React.FormEvent<HTMLFormElement> & {
  target: {
    email: { value: string; }
    password: { value: string; }
    passwordConfirmation: { value: string; }
  }
}