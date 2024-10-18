export function checkPlayerGuess(playerGuess) {
    let checkSet = new Set;
    for (const letter in playerGuess){
        checkSet.add(playerGuess[letter])
    }
    if (checkSet.size == 4) {
        return true;
    }
}