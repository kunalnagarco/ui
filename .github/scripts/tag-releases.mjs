// scripts/tag-releases.mjs
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const releases = JSON.parse(readFileSync(".released-packages.json", "utf8"));

for (const { name, version } of Object.values(releases)) {
  execSync(`git tag '${name}@${version}'`);
}
