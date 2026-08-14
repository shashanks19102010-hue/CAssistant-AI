import {
  checkCommand
} from "./dependency-check";

export async function getDependencyReport() {
  const [
    node,
    npm,
    git,
    python,
    ffmpeg,
    blender
  ] =
    await Promise.all([
      checkCommand(
        "node"
      ),

      checkCommand(
        "npm"
      ),

      checkCommand(
        "git"
      ),

      checkCommand(
        process.platform ===
          "win32"
          ? "python"
          : "python3"
      ),

      checkCommand(
        "ffmpeg"
      ),

      checkCommand(
        "blender"
      )
    ]);

  return {
    node,
    npm,
    git,
    python,
    ffmpeg,
    blender,

    timestamp:
      Date.now()
  };
}