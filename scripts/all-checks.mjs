import {
  execFileSync
} from "node:child_process";

const commands = [
  [
    "environment",
    "node",
    [
      "scripts/check-environment.mjs"
    ]
  ],

  [
    "routes",
    "node",
    [
      "scripts/check-api-routes.mjs"
    ]
  ],

  [
    "imports",
    "node",
    [
      "scripts/check-imports.mjs"
    ]
  ],

  [
    "security",
    "node",
    [
      "scripts/security-config-check.mjs"
    ]
  ],

  [
    "native",
    "node",
    [
      "desktop/scripts/check-native-config.mjs"
    ]
  ],

  [
    "typecheck",
    "npm",
    [
      "run",
      "typecheck"
    ]
  ],

  [
    "tests",
    "npm",
    [
      "run",
      "test"
    ]
  ]
];

for (
  const [
    name,
    executable,
    args
  ] of commands
) {
  console.log(
    `\n========== ${name} ==========`
  );

  execFileSync(
    executable,
    args,
    {
      stdio:
        "inherit"
    }
  );
}

console.log(
  "\nALL STATIC CHECKS PASSED."
);