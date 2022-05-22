"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs
    .readFileSync("./inputs/day5-input.txt")
    .toString()
    .split(",")
    .map(function (i) { return Number(i); });
function processIntCode(prog) {
    return [0];
}
function processParameterMode(paramSpecs) {
    var workArray = paramSpecs
        .toString()
        .split("")
        .map(function (i) { return Number(i); });
    var opcode = Number(workArray.slice(workArray.length - 1, workArray.length).join());
    var instr = {
        operation: opcode,
        pmodes: workArray.slice(0, workArray.length - 1)
    };
    return instr;
}
console.log(processParameterMode(1002));
