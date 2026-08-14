const base =
  process.env.CASSISTANT_URL ??
  "http://127.0.0.1:3000";

const response =
  await fetch(
    `${base}/api/system/final-check`,
    {
      signal:
        AbortSignal.timeout(
          30000
        )
    }
  );

const data =
  await response.json();

console.log(
  JSON.stringify(
    data,
    null,
    2
  )
);

if (!response.ok) {
  process.exit(
    1
  );
}

console.log(
  "CAssistant final system check passed."
);