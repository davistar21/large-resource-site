let totalNChances;
export default function totalChances(element){
    if (element == 'easy'){
       return 15;
    } else if (element == 'medium'){
       return 10;
    } else if (element == 'hard'){
       return 5;
    }
    return 0
}