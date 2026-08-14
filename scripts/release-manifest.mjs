import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));

const manifest = {
  product: "CAssistant",
  version: packageJson.version ?? "0.0.0",
  generatedAt: new Date().toISOString(),
  node: process.version,
  platform: process.platform,
  architecture: process.arch,
  sourceStatus: "integration-testing",
  productionStatus: "not-verified",
  notes: [
    "Actual model and engine availability depends on the target device.",
    "Native secure storage and sandboxing require platform-specific validation.",
    "Production readiness requires a successful build and end-to-end testing."
  ]
};

console.log(JSON.stringify(manifest, null, 2));
