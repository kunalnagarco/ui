// scripts/publish-release.mjs
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const releases = JSON.parse(readFileSync(".released-packages.json", "utf8"));

for (const [dir] of Object.entries(releases)) {
  execSync(
    `npm publish --workspace=${dir} --provenance --access public --tag latest`,
    { stdio: "inherit" }
  );
}
