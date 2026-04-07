// scripts/publish-prerelease.mjs
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const packageDirs = [
  "packages/eslint-config",
  "packages/rest-client",
  "packages/tsconfig",
];

const timestamp = Date.now();

for (const dir of packageDirs) {
  const pkgPath = resolve(dir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  if (pkg.private) continue;

  const preVersion = `${pkg.version}-alpha.${timestamp}`;
  console.log(`Publishing ${pkg.name}@${preVersion}`);

  pkg.version = preVersion;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

  execSync(`npm publish --workspace=${dir} --tag alpha --access public`, {
    stdio: "inherit",
  });
}
