import * as fs from "fs"

type wire = {
    points: point[];
}

type point = {
    x: number;
    y: number;
}

type instruction = {
    direction: string;
    distance: number;
}
const wires: string[] = fs.readFileSync('./solutions/inputs/day3-input.txt').toString().split("\n")
function parseInstructions(w: string): instruction[] {
    return w.split(',')
        .map(i => {
            return { direction: i[0], distance: Number(i.slice(1, i.length)) }
        }
        )
}

function createWire(w: instruction[]): wire {
    let ret = { points: [{ x: 0, y: 0 }] }
    let start: point = { x: 0, y: 0 }
    let curr: point = start
    for (let i of w) {
        let { direction, distance } = i
        switch (direction) {
            case "U":
                for (let j = 0; j < distance; j++) {
                    curr = { x: curr.x, y: curr.y + 1 }
                    ret.points.push(curr)
                }
                break;
            case "D":
                for (let j = 0; j < distance; j++) {
                    curr = { x: curr.x, y: curr.y - 1 }
                    ret.points.push(curr)
                }
                break;
            case "R":
                for (let j = 0; j < distance; j++) {
                    curr = { x: curr.x + 1, y: curr.y }
                    ret.points.push(curr)
                }
                break;
            case "L":
                for (let j = 0; j < distance; j++) {
                    curr = { x: curr.x - 1, y: curr.y }
                    ret.points.push(curr)
                }
                break;
        }
    }
    return ret
}

function findWireIntersects(a: wire, b: wire): point[] {
    let intersections = []
    for (let i of a.points) {
        for (let j of b.points) {
            if (i.x === j.x && i.y === j.y) {
                intersections.push(i)
            }
        }
    }
    return intersections
}

function calcManhattanDistance(a: point, b: point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function calcTotalWireDistance(p: point, a: wire, b: wire): number {
    let aDist = a.points.findIndex(i => i.x === p.x && i.y === p.y)
    let bDist = b.points.findIndex(i => i.x === p.x && i.y === p.y)
    return aDist + bDist
}
function solve(input: string[]): number[] {
    let instructions = input.map(i => parseInstructions(i))
    let [a, b] = instructions.map(i => createWire(i))
    let intersections = findWireIntersects(a, b)
    let distances = intersections.map(i => calcManhattanDistance({ x: 0, y: 0 }, i))
    let distance2 = intersections.map(i => calcTotalWireDistance(i, a, b))
    return [Math.min(...distances.slice(1, distances.length)), Math.min(...distance2.slice(1, distance2.length))]
}
let [partOne, partTwo] = solve(wires)
let outputStringDay3 = `Day 3\nPart One: ${partOne} \nPart Two: ${partTwo}\n`
export { outputStringDay3 }