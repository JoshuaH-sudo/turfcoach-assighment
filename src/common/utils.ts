/**
 * Capitalize the first character in string
 *
 * @remarks source: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
 */
export function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1)
}
