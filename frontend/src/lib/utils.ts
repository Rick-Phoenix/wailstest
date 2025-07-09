import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

type ClassDictionary = Record<string, string[] | string>;

function getClassName(prefix: string, value: string): string {
  if (prefix.startsWith("%")) {
    return value;
  }

  return prefix + value;
}

export function cp(dict: ClassDictionary): string[] {
  const pairs = Object.entries(dict);

  const classes: string[] = [];

  for (const [prefix, value] of pairs) {
    if (typeof value === "string") {
      classes.push(getClassName(prefix, value));
    } else if (Array.isArray(value)) {
      for (const suffix of value) {
        classes.push(getClassName(prefix, suffix));
      }
    }
  }

  return classes;
}

export function fcp(dict: ClassDictionary): string {
  const classes = cp(dict);
  return classes.join(" ");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, "children">
  : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};
