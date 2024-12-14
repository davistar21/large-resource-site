export default function saveToStorage(item) {
    localStorage.setItem(`${item}`, JSON.stringify(item))
}