import * as fs from "fs";

let input: string[] = fs
  .readFileSync("./inputs/day6-input.txt")
  .toString()
  .split("\n");

let orbitSystem = {};
for (let i of input) {
  const [parent, child] = i.split(")");
  if (orbitSystem[parent]) {
    orbitSystem[parent].children.push(child);
  } else {
    orbitSystem[parent] = {
      parent: null,
      children: [child],
    };
  }
  if (orbitSystem[child]) {
    orbitSystem[child].parent = parent;
  } else {
    orbitSystem[child] = {
      parent,
      children: [],
    };
  }
}
function getDepth(orbit) {
  let parent = orbit.parent;
  let count = 0;
  while (parent) {
    parent = orbitSystem[parent].parent;
    count++;
  }
  return count;
}
let output = 0;
for (let o of Object.keys(orbitSystem)) {
  output += getDepth(orbitSystem[o]);
}
function chainUp(orbit) {
  const chain = [];
  let parent = orbit.parent;
  while (parent) {
    chain.push(parent);
    parent = orbitSystem[parent].parent;
  }
  return chain;
}
const youChain = chainUp(orbitSystem["YOU"]);
const sanChain = chainUp(orbitSystem["SAN"]);
for (let i = 0; i < youChain.length; i++) {
  const val = youChain[i];
  const idx = sanChain.indexOf(val);
  if (idx >= 0) {
    console.log(idx + i);
    break;
  }
}
