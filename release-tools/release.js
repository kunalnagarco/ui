/**
 * When merging to main, GitHub actions will release a version to npm
 * for each package in the yarn workspace.
 */
const { program } = require("commander");
const { $, cd, glob } = require("zx");
const { readFileSync } = require("fs");

program.option("--commit-message");

program.parse(process.argv);

const options = program.opts();
console.log(options);
const commitMessage = options.commitMessage;

console.log("commit message", commitMessage);

/**
 * 1. create git tag + github release
 * 2. create npm version + tag (latest)
 * 3. update the new version back into the repo (push from github actions)
 */
async function main() {
  // const pathPrefix = ".";
  // const packages = await glob(`${pathPrefix}/packages/*`, {
  //   deep: 1,
  //   onlyDirectories: true,
  // });
  // $.verbose = true;
  // for (const dir of packages) {
  //   const before = process.cwd();
  //   cd(dir);
  //   const packageJsonStr = readFileSync("package.json", {
  //     encoding: "utf8",
  //   });
  //   const { version } = JSON.parse(packageJsonStr);
  //   const hash = new Date().getTime();
  //   await $`yarn version --immediate ${version}-alpha-${hash}`;
  //   await $`yarn npm publish --tag alpha`;
  //   cd(before);
  // }
}

/**
 * This script should only be run on GitHub actions. There is an explicit
 * check for the GitHub actions environment to prevent this script from publishing
 * versions from local environments.
 *
 * More info: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#default-environment-variables
 */
if (process.env.CI) {
  main();
}
