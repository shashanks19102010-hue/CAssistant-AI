import {
  setRuntimeState
} from "./runtime-state-store";

import {
  startCAssistantRuntime
} from "./cassistant-runtime";

import {
  validateConfig
} from "./config-validation";

import {
  initializeAllSystems
} from "./system-control";

let bootPromise:
  | Promise<void>
  | undefined;

export async function bootCAssistant() {
  if (bootPromise) {
    return bootPromise;
  }

  bootPromise =
    (async () => {
      await setRuntimeState({
        state:
          "starting",

        startedAt:
          Date.now(),

        lastError:
          undefined
      });

      try {
        const config =
          validateConfig();

        if (!config.valid) {
          throw new Error(
            "CAssistant configuration is invalid."
          );
        }

        await startCAssistantRuntime();

        await initializeAllSystems();

        await setRuntimeState({
          state:
            "ready",

          readyAt:
            Date.now()
        });
      } catch (error) {
        await setRuntimeState({
          state:
            "failed",

          lastError:
            error instanceof
            Error
              ? error.message
              : String(error)
        });

        throw error;
      }
    })();

  try {
    await bootPromise;
  } finally {
    bootPromise =
      undefined;
  }
}