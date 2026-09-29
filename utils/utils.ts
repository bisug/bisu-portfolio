export const kebabCase = (str: string) =>
  str
    .replace(/\+/g, "p")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_.]+/g, "-")
    .toLowerCase();
