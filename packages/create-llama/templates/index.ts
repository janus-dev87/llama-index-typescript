import { copy } from "../helpers/copy";
import { install } from "../helpers/install";

import fs from "fs/promises";
import os from "os";
import path from "path";
import { bold, cyan } from "picocolors";
import { version } from "../package.json";

import { InstallTemplateArgs } from "./types";

/**
 * Install a LlamaIndex internal template to a given `root` directory.
 */
export const installTemplate = async ({
  appName,
  root,
  packageManager,
  isOnline,
  template,
  framework,
  eslint,
}: InstallTemplateArgs) => {
  console.log(bold(`Using ${packageManager}.`));

  /**
   * Copy the template files to the target directory.
   */
  console.log("\nInitializing project with template:", template, "\n");
  const templatePath = path.join(__dirname, template, framework);
  const copySource = ["**"];
  if (!eslint) copySource.push("!eslintrc.json");

  await copy(copySource, root, {
    parents: true,
    cwd: templatePath,
    rename(name) {
      switch (name) {
        case "gitignore":
        case "eslintrc.json": {
          return `.${name}`;
        }
        // README.md is ignored by webpack-asset-relocator-loader used by ncc:
        // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
        case "README-template.md": {
          return "README.md";
        }
        default: {
          return name;
        }
      }
    },
  });

  /**
   * Update the package.json scripts.
   */
  const packageJsonFile = path.join(root, "package.json");
  const packageJson: any = JSON.parse(
    await fs.readFile(packageJsonFile, "utf8"),
  );
  packageJson.name = appName;
  packageJson.version = "0.1.0";

  packageJson.dependencies = {
    ...packageJson.dependencies,
    llamaindex: version,
  };

  if (!eslint) {
    // Remove packages starting with "eslint" from devDependencies
    packageJson.devDependencies = Object.fromEntries(
      Object.entries(packageJson.devDependencies).filter(
        ([key]) => !key.startsWith("eslint"),
      ),
    );
  }
  await fs.writeFile(
    packageJsonFile,
    JSON.stringify(packageJson, null, 2) + os.EOL,
  );

  console.log("\nInstalling dependencies:");
  for (const dependency in packageJson.dependencies)
    console.log(`- ${cyan(dependency)}`);

  console.log("\nInstalling devDependencies:");
  for (const dependency in packageJson.devDependencies)
    console.log(`- ${cyan(dependency)}`);

  console.log();

  await install(packageManager, isOnline);
};

export * from "./types";
