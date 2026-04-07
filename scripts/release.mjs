// scripts/release.mjs
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const prTitle = process.env.PR_TITLE;
const changedFiles =
  process.env.CHANGED_FILES?.split("\n").filter(Boolean) ?? [];

if (!prTitle) {
  console.error("PR_TITLE env var is required");
  process.exit(1);
}

// --- Determine bump type ---
function getBumpType(title) {
  if (/^(feat|fix|refactor|perf)!:/.test(title)) return "major";
  if (/^feat:/.test(title)) return "minor";
  return "patch";
}

const bump = getBumpType(prTitle);

// --- Determine changelog section ---
function getSection(title) {
  if (/^feat/.test(title)) return "Features";
  if (/^fix/.test(title)) return "Bug Fixes";
  if (/^perf/.test(title)) return "Performance Improvements";
  return "Miscellaneous";
}

const section = getSection(prTitle);
// Strip the conventional commit prefix from the title for the changelog entry
const changeDescription = prTitle.replace(/^\w+(\(.*?\))?!?:\s*/, "");

// --- Detect changed packages ---
const packageMap = {
  "packages/eslint-config": "@kunalnagarco/eslint-config",
  "packages/rest-client": "@kunalnagarco/ui.rest-client",
  "packages/tsconfig": "@kunalnagarco/ui.tsconfig",
};

const changedPackageDirs = Object.keys(packageMap).filter((dir) =>
  changedFiles.some((f) => f.startsWith(dir + "/"))
);

if (changedPackageDirs.length === 0) {
  console.log("No package files changed, skipping release.");
  process.exit(0);
}

console.log(`Bump type: ${bump}`);
console.log(`Changed packages: ${changedPackageDirs.join(", ")}`);

// --- Bump and update changelog ---
const today = new Date().toISOString().slice(0, 10);
const releasedVersions = {};

for (const dir of changedPackageDirs) {
  const pkgPath = resolve(dir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

  // Compute new version
  const [major, minor, patch] = pkg.version.split(".").map(Number);
  let newVersion;
  if (bump === "major") newVersion = `${major + 1}.0.0`;
  else if (bump === "minor") newVersion = `${major}.${minor + 1}.0`;
  else newVersion = `${major}.${minor}.${patch + 1}`;

  console.log(`${pkg.name}: ${pkg.version} → ${newVersion}`);
  releasedVersions[dir] = { name: pkg.name, version: newVersion };

  // Update package.json
  pkg.version = newVersion;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

  // Update CHANGELOG.md
  const changelogPath = resolve(dir, "CHANGELOG.md");
  const entry = `## [${newVersion}] - ${today}\n\n### ${section}\n\n- ${changeDescription}\n\n`;
  const existing = existsSync(changelogPath)
    ? readFileSync(changelogPath, "utf8")
    : "# Changelog\n\n";

  // Insert after the top-level heading
  const insertAfter = "# Changelog\n\n";
  const updated = existing.startsWith(insertAfter)
    ? insertAfter + entry + existing.slice(insertAfter.length)
    : entry + existing;

  writeFileSync(changelogPath, updated);
}

// --- Write released versions for the publish step ---
writeFileSync(
  ".released-packages.json",
  JSON.stringify(releasedVersions, null, 2)
);
