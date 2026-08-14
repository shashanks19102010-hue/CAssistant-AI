import { access } from "node:fs/promises";

const required = ["package.json", "tsconfig.json"];
let failed = false;

for (const file of required) {
  try {
    await access(file);
    console.log(`PASS ${file}`);
  } catch {
    failed = true;
    console.error(`FAIL ${file}`);
  }
}

if (!process.version.startsWith("v22")) {
  console.warn(`WARNING: expected Node 22, detected ${process.version}`);
}

if (failed) process.exit(1);
