export default function moveToNext(current, nextId, inputLength) {
    if (current.value.length === 1 && nextId && nextId < inputLength + 1) {
        document.getElementById(nextId).focus();
    }
}
export function moveToPrevious(current, previousId) {
    if (current.value.length === 0 && previousId) {
        document.getElementById(previousId).focus();
    }
}
