const inputRange = [197487, 673251]
let passesPartOne = 0
//part one
for (let i = inputRange[0]; i < inputRange[1]; i++) {
    let j = i;
    let double = false;
    let decrease = false;

    let k = j.toString().split('').map(i => Number(i))
    for (let l = 0; l < k.length; l++) {
        if (l < k.length - 1 && k[l] === k[l + 1]) {
            double = true
        }
        if (l < k.length - 1 && k[l + 1] < k[l]) {
            decrease = true
            break
        }
    }
    if (!decrease && double) {
        passesPartOne++
    }
}
//part two
let passesPartTwo = 0
for (let i = inputRange[0]; i < inputRange[1]; i++) {
    let j = i;
    let repeats = false;
    let decrease = false;

    let k = j.toString().split('').map(i => Number(i))
    for (let l = 0; l < k.length; l++) {
        if (l < k.length - 1 && k[l] === k[l + 1] && k[l - 1] !== k[l + 1] && k[l] !== k[l + 2]) {
            repeats = true
        }
        if (l < k.length - 1 && k[l + 1] < k[l]) {
            decrease = true
            break
        }
    }
    if (!decrease && repeats) {
        passesPartTwo++
    }
}
let outputStringDay4 = `Day 4\nPart One: ${passesPartOne} \nPart Two: ${passesPartTwo}\n`
export { outputStringDay4 }
