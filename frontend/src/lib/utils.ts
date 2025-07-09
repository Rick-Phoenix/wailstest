import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

type ClassDictionary = Record<
  string,
  string[] | string | { [key: string]: ClassDictionary }
>;

function getPrefix(rawPrefix: string): string {
  if (rawPrefix === "" || rawPrefix.startsWith("%")) {
    return "";
  }

  if (!rawPrefix.startsWith("[[") && !rawPrefix.endsWith(":")) {
    return rawPrefix + ":";
  }

  return rawPrefix;
}

function recursiveGetClass(classItem: ClassItem, prefix = ""): string[] {
  const classes: string[] = [];
  const parsedPrefix = getPrefix(prefix);
  if (typeof classItem === "string") {
    classes.push(parsedPrefix + classItem);
  } else if (Array.isArray(classItem)) {
    for (const suffix of classItem) {
      classes.push(parsedPrefix + suffix);
    }
  } else {
    const pairs = Object.entries(classItem);
    for (const [key, val] of pairs) {
      classes.push(...recursiveGetClass(val, parsedPrefix + key));
    }
  }

  return classes;
}

type ClassItem = ClassDictionary | string | string[] | {
  [key: string]: ClassDictionary;
};

export function cp(...classes: ClassItem[]): string[] {
  const output: string[] = [];

  for (const classItem of classes) {
    output.push(...recursiveGetClass(classItem));
  }

  return output;
}

export function fcp(...classes: ClassItem[]): string {
  const output: string[] = [];

  for (const classItem of classes) {
    output.push(...cp(classItem));
  }
  return output.join(" ");
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
