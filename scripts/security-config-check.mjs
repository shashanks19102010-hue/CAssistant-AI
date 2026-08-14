const checks = [
  ["Local-only default", process.env.CASSISTANT_LOCAL_ONLY !== "false"],
  ["Telemetry disabled by default", process.env.CASSISTANT_TELEMETRY !== "true"]
];

let failed = false;

for (const [name, passed] of checks) {
  if (passed) console.log(`PASS ${name}`);
  else {
    console.error(`FAIL ${name}`);
    failed = true;
  }
}

if (failed) process.exit(1);
