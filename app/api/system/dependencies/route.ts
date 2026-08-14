import { NextResponse } from "next";

import {
  getDependencyReport
} from "@/lib/dependency-report";

export async function GET() {
  return NextResponse.json({
    ok: true,

    dependencies:
      await getDependencyReport()
  });
}