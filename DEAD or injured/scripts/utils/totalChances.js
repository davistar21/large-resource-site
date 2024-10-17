export default function totalChances(difficulty){
    if (difficulty == 'easy'){
       return 15;
    } else if (difficulty == 'medium'){
       return 10;
    } else if (difficulty == 'hard'){
       return 5;
    }
    return 0
}