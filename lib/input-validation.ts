import { CAssistantError } from "./api-error";

export function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new CAssistantError("BAD_REQUEST", `${field} is required.`);
  }
  return value.trim();
}

export function optionalString(value: unknown): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string") throw new CAssistantError("BAD_REQUEST", "Expected a string.");
  return value;
}

export function stringArray(value: unknown, field: string): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new CAssistantError("BAD_REQUEST", `${field} must be an array of strings.`);
  }
  return value;
}

export function positiveInteger(value: unknown, field: string, fallback?: number): number {
  if (value === undefined && fallback !== undefined) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new CAssistantError("BAD_REQUEST", `${field} must be a positive integer.`);
  }
  return parsed;
}
