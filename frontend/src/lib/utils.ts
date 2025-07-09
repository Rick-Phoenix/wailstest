import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

type ClassDictionary = Record<
  string,
  string[] | string | { [key: string]: ClassItem } | Boolean
>;

function getClassName(prefix: string, suffix: string): string {
  if (suffix === "") {
    return "";
  }

  if (prefix.startsWith("%")) {
    return suffix;
  }

  if (suffix.startsWith("%")) {
    return prefix;
  }

  if (
    !suffix.startsWith("[") && !prefix.endsWith(":") && !prefix.endsWith("-")
  ) {
    return prefix + ":" + suffix;
  }

  return prefix + suffix;
}

function recursiveGetClass(classItem: ClassItem, prefix = ""): string[] {
  const classes: string[] = [];

  if (typeof classItem === "string") {
    classes.push(getClassName(prefix, classItem));
  } else if (Array.isArray(classItem)) {
    for (const suffix of classItem) {
      classes.push(getClassName(prefix, suffix));
    }
  } else if (classItem === true) {
    classes.push(prefix);
  } else if (typeof classItem === "object" && classItem) {
    const pairs = Object.entries(classItem);
    for (const [key, val] of pairs) {
      classes.push(...recursiveGetClass(val, getClassName(prefix, key)));
    }
  }

  return classes;
}

type ClassItem = ClassDictionary[string];

export function cd(dict: ClassDictionary, ...flatOpts: string[]): string[] {
  const entries = Object.entries(dict);
  const output: string[] = [];

  for (const [prefix, entry] of entries) {
    output.push(...recursiveGetClass(entry, prefix));
  }

  if (flatOpts) {
    output.push(...flatOpts);
  }

  return output;
}

export function fcd(dict: ClassDictionary, ...flatOpts: ClassValue[]): string {
  return twMerge(cd(dict), clsx(flatOpts));
}

export function fcc(callback: () => ClassDictionary) {
  return fcd(callback());
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
