const { $, cd, glob } = require("zx");
const { readFileSync } = require("fs");

async function main() {
  const pathPrefix = ".";
  const exclude = [];

  const packages = await glob(`${pathPrefix}/packages/*`, {
    deep: 1,
    onlyDirectories: true,
  });
  console.log(packages);
  for (const dir of packages) {
    const before = process.cwd();
    cd(dir);
    const packageJsonStr = readFileSync("package.json", {
      encoding: "utf8",
    });
    const { name, version } = JSON.parse(packageJsonStr);
    console.log(name, version);
    const hash = new Date().getTime();
    await $`yarn version --immediate ${version}-${hash}`;
    const packageJsonStr2 = readFileSync("package.json", {
      encoding: "utf8",
    });
    const { name2, version2 } = JSON.parse(packageJsonStr2);
    console.log(name2, version2);
    cd(before);
    // if (exclude.some((p) => dir.endsWith(p))) {
    //   console.log(`skipping build for ${dir}`);
    //   continue;
    // }
    // console.log(dir);
  }
}

main();
