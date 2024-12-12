export function checkPlayerGuess(playerGuess) {
    let checkSet = new Set;
    for (const number in playerGuess){
        checkSet.add(playerGuess[number])
    }
    if (checkSet.size == 4) {
        return true;
    } else return false
};