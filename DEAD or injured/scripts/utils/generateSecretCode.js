
export function randomNumberGenerator(limit=10) {
    const randomNumber = parseInt((Math.random())*limit)
    return String(randomNumber)
}
let secretCode;
export default function generateSecretCode() {
    const a = randomNumberGenerator()
    const b = randomNumberGenerator()
    const c = randomNumberGenerator()
    const d = randomNumberGenerator()
    if (a !== b && a !== c && a !== d && b !== c && b !== d && c !== d) {
        secretCode = a + b + c + d
    } else {
        generateSecretCode()
    }
    return secretCode
}
