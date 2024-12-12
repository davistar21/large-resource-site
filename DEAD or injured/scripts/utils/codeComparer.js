export default function compareCode(a, b){
    a = String(a);
    b = String(b);
    let arrayObject = {};
    let dead = 0; 
    let injured = 0;
    if (a.length == b.length){
        for(const i in a){
            if (b[i] == a[i]){
                dead += 1;
            } else if (b[i] !== a[i] && a.includes(b[i])){
                injured += 1;
            }
        };
        arrayObject.dead = dead;
        arrayObject.injured = injured;
        // console.log(`${dead} dead, ${injured} injured!`);
    } else console.log("Failed!");
    return arrayObject;
};
