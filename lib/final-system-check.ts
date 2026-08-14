import {
  validateConfig
} from "./config-validation";

import {
  getDependencyReport
} from "./dependency-report";

import {
  runCoreContracts
} from "./contract-tests";

import {
  runRuntimeSelfTest
} from "./runtime-self-test";

import {
  getRuntimeState
} from "./runtime-state-store";

export async function runFinalSystemCheck() {
  const [
    config,
    dependencies,
    runtime,
    state
  ] =
    await Promise.all([
      Promise.resolve(
        validateConfig()
      ),

      getDependencyReport(),

      Promise.resolve(
        runCoreContracts()
      ),

      getRuntimeState()
    ]);

  const requiredDeps = [
    "node",
    "npm",
    "git"
  ];

  const dependencyMap =
    dependencies as Record<
      string,
      unknown
    >;

  const dependenciesReady =
    requiredDeps.every(
      (name) =>
        (
          dependencyMap[
            name
          ] as {
            available?: boolean;
          } |
            undefined
        )?.available ===
        true
    );

  return {
    passed:
      config.valid &&
      dependenciesReady &&
      runtime.passed &&
      state.state !==
        "failed",

    configuration:
      config,

    dependencies,

    contracts:
      runtime,

    runtimeState:
      state,

    timestamp:
      Date.now()
  };
}