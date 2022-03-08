const inputRange = [197487, 673251];
let passesPartOne = 0;
let passesPartTwo = 0;

for (let i = inputRange[0]; i < inputRange[1]; i++) {
    let k = i
        .toString()
        .split("")
        .map((j) => Number(j));
    let double = false;
    let decrease = false;
    let repeats = false;
    for (let l = 0; l < k.length; l++) {
        if (l < k.length - 1 && k[l] === k[l + 1]) {
            double = true;
        }
        if (
            l < k.length - 1 &&
            k[l] === k[l + 1] &&
            k[l - 1] !== k[l + 1] &&
            k[l] !== k[l + 2]
        ) {
            repeats = true;
        }
        if (l < k.length - 1 && k[l + 1] < k[l]) {
            decrease = true;
            break;
        }
    }
    if (!decrease && double) {
        passesPartOne++;
    }
    if (!decrease && repeats) {
        passesPartTwo++;
    }
}

let outputStringDay4 = `Day 4\nPart One: ${passesPartOne} \nPart Two: ${passesPartTwo}\n`;
export { outputStringDay4 };
