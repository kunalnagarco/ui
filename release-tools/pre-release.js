const { $, cd, glob } = require("zx");
const { readFileSync } = require("fs");

async function main() {
  const pathPrefix = ".";
  const packages = await glob(`${pathPrefix}/packages/*`, {
    deep: 1,
    onlyDirectories: true,
  });
  $.verbose = true;
  for (const dir of packages) {
    const before = process.cwd();
    cd(dir);
    const packageJsonStr = readFileSync("package.json", {
      encoding: "utf8",
    });
    const { version } = JSON.parse(packageJsonStr);
    const hash = new Date().getTime();
    await $`echo "//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}" >> ./.npmrc`;
    await $`yarn version --immediate ${version}-alpha-${hash}`;
    await $`yarn npm publish --tag alpha`;
    cd(before);
  }
}

main();
