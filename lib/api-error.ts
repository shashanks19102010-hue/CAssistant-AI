import type { ApiErrorCode } from "./api-result";

export class CAssistantError extends Error {
  constructor(public readonly code: ApiErrorCode, message: string, public readonly details?: unknown) {
    super(message);
    this.name = "CAssistantError";
  }
}

export function isCAssistantError(value: unknown): value is CAssistantError {
  return value instanceof CAssistantError;
}
