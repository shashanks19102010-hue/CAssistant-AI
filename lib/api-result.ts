export type ApiErrorCode = "BAD_REQUEST" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "RATE_LIMITED" | "UNAVAILABLE" | "INTERNAL_ERROR";

export type ApiSuccess<T> = { ok: true; data: T };
export type ApiFailure = { ok: false; error: { code: ApiErrorCode; message: string; requestId: string; details?: unknown } };
export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export function success<T>(data: T): ApiSuccess<T> {
  return { ok: true, data };
}

export function failure(code: ApiErrorCode, message: string, requestId: string, details?: unknown): ApiFailure {
  return { ok: false, error: { code, message, requestId, details } };
}
