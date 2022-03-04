import * as fs from "fs"

let input: number[] = fs.readFileSync('./inputs/day2-input.txt').toString().split(',').map(i => Number(i))

//To do this, before running the program, replace position 1 with the value 12 and replace position 2 with the value 2. What value is left at position 0 after the program halts?
function processIntCode(prog: number[]): number[] {
    for (let i = 0; i < prog.length; i += 4) {
        let progCopy = [...prog]
        let operator = prog[i];
        let first = prog[prog[i + 1]];
        let second = prog[prog[i + 2]];
        let replace = prog[i + 3];
        if (operator === 1) {
            progCopy[replace] = first + second
        } else if (operator === 2) {
            progCopy[replace] = first * second
        } else {
            return prog
        }
        prog = progCopy
    }
    return prog;
}

//part one
// input[1] = 12
// input[2] = 2
let partOne = processIntCode(input)
//console.log(partOne[0])

//part two
function calcNounAndVerb(prog: number[], desiredOutput: number): number[] {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            let pc = [...prog]
            pc[1] = i
            pc[2] = j
            let ret = processIntCode(pc)
            if (ret[0] === desiredOutput) {
                return [i, j]
            }
        }
    }
    return [0, 1]
}
let partTwo = calcNounAndVerb(input, 19690720)
console.log(100 * partTwo[0] + partTwo[1])