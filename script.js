const fs = require("fs");
const pkg = require("./package.json");
const exec = require("child_process").exec;

const localDependencies = pkg.localDependencies;
const dependencyProject = `${__dirname}/svelte-app`;

localDependencies.forEach((dependency) => {
  const dependencyFolder = `${__dirname}/${dependency.name}`;

  if (!fs.existsSync(dependencyFolder)) {
    console.error(`No existe la carpeta ${dependencyFolder}`);
  } else {
    exec(`cd ${dependencyFolder} && npm link`).stdout.on("end", () => {
      exec(`cd ${dependencyProject} && npm link ${dependency.scope}/${dependency.name}`).stdout.on("end", () =>
        console.log(`${dependency.name} dependency linked!`)
      );
    });
  }
});
