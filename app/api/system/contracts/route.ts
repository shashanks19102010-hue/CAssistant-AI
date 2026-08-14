import { NextResponse } from "next";

import {
  runCoreContracts
} from "@/lib/contract-tests";

export async function GET() {
  const result =
    runCoreContracts();

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