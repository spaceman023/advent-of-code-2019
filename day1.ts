import * as fs from "fs"


let input: number[] = fs.readFileSync('./inputs/day1-input.txt').toString().split('\n').filter(i => i !== "").map(i => Number(i))

//part one
let partOne: number = input.reduce((a, b) => a + (Math.floor(b / 3) - 2), 0)



//part two
function massToFuel(mass: number): number {
    let totalFuel: number = 0
    if (mass <= 0) return totalFuel
    let additionalFuel: number = Math.max((Math.floor(mass / 3) - 2), 0)
    totalFuel += additionalFuel
    return totalFuel + massToFuel(additionalFuel)
}
let partTwo: number = input.reduce((a, b) => a + massToFuel(b), 0)

//output answers
let outputStringDay1 = `Day 1\nPart One: ${partOne} \nPart Two: ${partTwo}`
console.log(outputStringDay1)


export { outputStringDay1 }
