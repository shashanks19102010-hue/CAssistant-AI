import { NextResponse } from "next/server";
import { createRequestId } from "./request-id";
import { failure, success } from "./api-result";
import { CAssistantError } from "./api-error";

export function apiOk<T>(data: T, status = 200) {
  return NextResponse.json(success(data), { status });
}

export function apiFail(error: unknown) {
  const requestId = createRequestId();

  if (error instanceof CAssistantError) {
    const status = error.code === "BAD_REQUEST" ? 400 :
      error.code === "UNAUTHORIZED" ? 401 :
      error.code === "FORBIDDEN" ? 403 :
      error.code === "NOT_FOUND" ? 404 :
      error.code === "CONFLICT" ? 409 :
      error.code === "RATE_LIMITED" ? 429 :
      error.code === "UNAVAILABLE" ? 503 : 500;

    return NextResponse.json(
      failure(error.code, error.message, requestId, error.details),
      { status }
    );
  }

  return NextResponse.json(
    failure("INTERNAL_ERROR", "CAssistant encountered an internal error.", requestId),
    { status: 500 }
  );
}
