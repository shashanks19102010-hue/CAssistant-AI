import { NextResponse } from "next";

import {
  bootCAssistant
} from "@/lib/runtime-boot";

import {
  getRuntimeState
} from "@/lib/runtime-state-store";

export async function GET() {
  try {
    await bootCAssistant();

    return NextResponse.json({
      ok: true,
      state:
        await getRuntimeState()
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        state:
          await getRuntimeState()
      },
      {
        status: 503
      }
    );
  }
}