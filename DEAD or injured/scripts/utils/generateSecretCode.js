
function randomNumberGenerator() {
    const randomNumber = parseInt((Math.random())*10)
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
