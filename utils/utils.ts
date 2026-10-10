export const kebabCase = (str: string) => {
  if (str.toLowerCase() === "c++") return "cpp";
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};
