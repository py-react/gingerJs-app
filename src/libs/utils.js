const { clsx } = require("clsx");
const { twMerge } = require("tailwind-merge");

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function slugGenerator(input) {
  // Convert to lowercase and replace spaces and special characters with underscores
  return input
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Add underscore between lower to upper case
    .toLowerCase() // Convert to lowercase
    .replace(/[\s\W]+/g, '_'); // Replace spaces and special characters with underscores
}
