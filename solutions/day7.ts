import * as fs from "fs";

let program: number[] = fs
  .readFileSync("./inputs/day7-input.txt")
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
    console.log({ input });
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
  ): any => {
    const pos = params[0];
    const output = program[pos];
    console.log({ output, pos });
    return [program, output];
  },
};

const lessthan: intProg = {
  opcode: 7,
  numberOfParams: 3,
  prog: (
    pmodes: number[],
    params: number[],
    program: number[],
    input: number
  ): number[] => {
    const [p1, p2] = handleParamModes(pmodes, params, program);
    const [, , pos] = params;
    const output = p1 < p2 ? 1 : 0;
    program.splice(pos, 1, output);
    return program;
  },
};

const equals: intProg = {
  opcode: 8,
  numberOfParams: 3,
  prog: (
    pmodes: number[],
    params: number[],
    program: number[],
    input: number
  ): number[] => {
    const [p1, p2] = handleParamModes(pmodes, params, program);
    const [, , pos] = params;
    const output = p1 === p2 ? 1 : 0;
    program.splice(pos, 1, output);
    return program;
  },
};

const operations = [add, multiply, print, output, equals, lessthan];

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

function run(program: number[], inputs: number[]): number {
  let ptr: number = 0;
  let inputIndex = 0;
  let output = 0;
  while (ptr < program.length) {
    const op: number = program[ptr];
    if (op === 99) break;
    const { opcode, pmodes } = processParameterMode(op);
    if (opcode === 5 || opcode === 6) {
      const params = program.slice(ptr + 1, ptr + 3);
      const [p1, pos] = handleParamModes(pmodes, params, program);
      if (opcode === 5) {
        if (p1 !== 0) {
          ptr = pos;
        } else {
          ptr += 3;
        }
      } else if (opcode === 6) {
        if (p1 === 0) {
          ptr = pos;
        } else {
          ptr += 3;
        }
      }
    } else {
      const cop = operations.find((i) => i.opcode === opcode);
      const params = program.slice(ptr + 1, ptr + 1 + cop.numberOfParams);
      if (opcode != 4) {
        program = cop.prog(pmodes, params, program, inputs[inputIndex]);
      } else {
        [program, output] = cop.prog(
          pmodes,
          params,
          program,
          inputs[inputIndex]
        );
      }
      if (opcode === 3) inputIndex++;
      ptr += cop.numberOfParams + 1;
    }
  }
  return output;
}

const permutator = (inputArr = []) => {
  let result = [];

  const permute = (arr = [], m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

const possibleSequences = permutator([0, 1, 2, 3, 4]);
let max = 0;
for (let p of possibleSequences) {
  let result = 0;
  for (let i of p) {
    result = run(program, [i, result]);
  }
  if (result > max) {
    max = result;
  }
}
console.log(max)
