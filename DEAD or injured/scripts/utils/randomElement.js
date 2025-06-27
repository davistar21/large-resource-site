import { randomNumberGenerator } from "./generateSecretCode.js"

const randomElement = (arr) => {
  if (!Array.isArray(arr)) return

  return arr[randomNumberGenerator(arr.length)]
}


export default randomElement
