import {
  classifyRequest
} from "./request-classifier";

import {
  decideResearchNeed
} from "./research-gate";

import {
  inspectCommand
} from "./command-policy";

export function runCoreContracts() {
  const checks: {
    name: string;
    passed: boolean;
  }[] = [];

  checks.push({
    name:
      "image classification",

    passed:
      classifyRequest(
        "create an image"
      ).capability ===
      "image"
  });

  checks.push({
    name:
      "code classification",

    passed:
      classifyRequest(
        "write Java code"
      ).capability ===
      "code"
  });

  checks.push({
    name:
      "research detection",

    passed:
      decideResearchNeed(
        "what is the latest news?"
      ).shouldResearch
  });

  checks.push({
    name:
      "dangerous command blocked",

    passed:
      !inspectCommand(
        "shutdown",
        []
      ).allowed
  });

  checks.push({
    name:
      "safe command accepted",

    passed:
      inspectCommand(
        "git",
        [
          "status"
        ]
      ).allowed
  });

  return {
    passed:
      checks.every(
        (check) =>
          check.passed
      ),

    checks
  };
}