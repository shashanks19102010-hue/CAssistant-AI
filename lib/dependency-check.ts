import { execFile } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execFile);

export type DependencyResult = {
  command: string;
  available: boolean;
  version?: string;
  error?: string;
};

export async function checkCommand(command: string, args = ["--version"]): Promise<DependencyResult> {
  try {
    const result = await exec(command, args, { timeout: 5000 });
    return {
      command,
      available: true,
      version: (result.stdout || result.stderr || "").trim()
    };
  } catch (error) {
    return {
      command,
      available: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
