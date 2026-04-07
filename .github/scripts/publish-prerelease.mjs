// scripts/publish-prerelease.mjs
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const packageDirs = [
  "packages/eslint-config",
  "packages/rest-client",
  "packages/tsconfig",
];

// Load all non-private packages
const packages = {};
for (const dir of packageDirs) {
  const pkgPath = resolve(dir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  if (pkg.private) continue;
  packages[dir] = { name: pkg.name, version: pkg.version, pkg, pkgPath };
}

// Build reverse dependency map: dir -> set of dirs that depend on it
const nameToDir = Object.fromEntries(
  Object.entries(packages).map(([dir, { name }]) => [name, dir])
);

const dependents = Object.fromEntries(
  Object.keys(packages).map((dir) => [dir, new Set()])
);

for (const [dir, { pkg }] of Object.entries(packages)) {
  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
  };
  for (const depName of Object.keys(allDeps)) {
    const depDir = nameToDir[depName];
    if (depDir) {
      dependents[depDir].add(dir);
    }
  }
}

// Detect changed files
const changedFiles = (process.env.CHANGED_FILES ?? "")
  .split("\n")
  .filter(Boolean);

const directlyChanged = new Set(
  Object.keys(packages).filter((dir) =>
    changedFiles.some((f) => f.startsWith(dir + "/"))
  )
);

if (directlyChanged.size === 0) {
  console.log("No package files changed, skipping prerelease.");
  process.exit(0);
}

// Expand to include packages that depend on a changed package
const toPublish = new Set(directlyChanged);
for (const dir of directlyChanged) {
  for (const dependent of dependents[dir]) {
    toPublish.add(dependent);
  }
}

console.log(`Changed packages: ${[...directlyChanged].join(", ")}`);
console.log(`Publishing: ${[...toPublish].join(", ")}`);

const timestamp = Date.now();

for (const dir of packageDirs) {
  if (!toPublish.has(dir)) continue;

  const { pkg, pkgPath } = packages[dir];
  const preVersion = `${pkg.version}-alpha.${timestamp}`;
  console.log(`Publishing ${pkg.name}@${preVersion}`);

  pkg.version = preVersion;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

  execSync(
    `npm publish --workspace=${dir} --provenance --tag alpha --access public`,
    { stdio: "inherit" }
  );
}
