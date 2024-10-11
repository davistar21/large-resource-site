let totalNChances;
export default function totalChances(element){
    if (element.value == 'easy'){
        totalNChances = 15;
    } else if (element.value == 'medium'){
        totalNChances = 10;
    } else if (element.value == 'hard'){
        totalNChances = 5;
    }
    return totalNChances
}