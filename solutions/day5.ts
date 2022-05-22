import * as fs from "fs";

let program: number[] = fs
  .readFileSync("./inputs/day5-input.txt")
  .toString()
  .split(",")
  .map((i) => Number(i));

type instruction = {
  opcode: number;
  pmodes: number[];
};

type intProg = {
  opcode: number;
  numberOfParams: number;
  prog: Function;
};

const add: intProg = {
  opcode: 1,
  numberOfParams: 3,
  prog: (pmodes: number[], params: number[], program: number[]): number[] => {
    const [p1, p2] = handleParamModes(pmodes, params, program);
    const [, , pos] = params;
    const output = p1 + p2;
    program.splice(pos, 1, output);
    return program;
  },
};

const multiply: intProg = {
  opcode: 2,
  numberOfParams: 3,
  prog: (pmodes: number[], params: number[], program: number[]): number[] => {
    const [p1, p2] = handleParamModes(pmodes, params, program);
    const [, , pos] = params;
    const output = p1 * p2;
    program.splice(pos, 1, output);
    return program;
  },
};

const print: intProg = {
  opcode: 3,
  numberOfParams: 1,
  prog: (
    pmodes: number[],
    params: number[],
    program: number[],
    input: number
  ): number[] => {
    const pos = params[0];
    program.splice(pos, 1, input);
    return program;
  },
};

const output: intProg = {
  opcode: 4,
  numberOfParams: 1,
  prog: (
    pmodes: number[],
    params: number[],
    program: number[],
    input: number
  ): number[] => {
    const pos = params[0];
    const output = program[pos];
    console.log({ output, pos });
    return program;
  },
};

const operations = [add, multiply, print, output];

function processParameterMode(paramSpecs: number): instruction {
  let workArray = paramSpecs
    .toString()
    .split("")
    .map((i) => Number(i));
  let opcode = Number(
    workArray.slice(workArray.length - 1, workArray.length).join()
  );
  let wslice = workArray.slice(0, workArray.length - 2);
  let pmodes = Array(3 - wslice.length)
    .fill(0)
    .concat(wslice)
    .reverse();
  let instr: instruction = {
    opcode: opcode,
    pmodes: pmodes,
  };
  return instr;
}

function handleParamModes(
  pmodes: number[],
  params: number[],
  program: number[]
): number[] {
  return params.map((v, i) => {
    if (pmodes[i] === 0) {
      return program[v];
    } else {
      return v;
    }
  });
}

function run(program: number[], input: number): void {
  let ptr: number = 0;
  while (ptr < program.length) {
    const op: number = program[ptr];
    if (op === 99) break;
    const { opcode, pmodes } = processParameterMode(op);
    const cop = operations.find((i) => i.opcode === opcode);
    const params = program.slice(ptr + 1, ptr + 1 + cop.numberOfParams);
    program = cop.prog(pmodes, params, program, input);
    ptr += cop.numberOfParams + 1;
  }
}
run(program, 1);
