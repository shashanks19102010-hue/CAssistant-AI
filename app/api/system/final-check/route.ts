import { NextResponse } from "next";

import {
  runFinalSystemCheck
} from "@/lib/final-system-check";

export async function GET() {
  const result =
    await runFinalSystemCheck();

  return NextResponse.json(
    {
      ok:
        result.passed,

      result
    },
    {
      status:
        result.passed
          ? 200
          : 503
    }
  );
}