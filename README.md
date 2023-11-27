<!-- once setup delete from here... -->
# How to setup a package from this template

1. in github create a new project from this template with the `Use this template` button. NB the Coveralls git Action running from this commit will fail because the secret will not be present yet (see below) 
1. In package.json change the following to the values you need:
    - name
    - version
    - description
    - repository
    - keywords
    - author
    - license
1. Delete the package-lock.json file (a new one will be automatically created)
1. In README.md replace all references to `template-typescript-node-library`. A find replace on `x-ware-ltd/template-typescript-node-library` may be sufficient, but review each change. The badges will start working again once all the steps below have been completed.
1. In a terminal run `> npm install` which will install all the dependencies and recreate the package-lock.json file. It will also run tests which should all pass.
1. visit [coveralls.io](https://coveralls.io/), create an account if you don't already have one, and add the project. Find the Token in coveralls.io and add it to github secrets: Settings/Secrets and variables/Actions/Repository secret (`COVERALLS_REPO_TOKEN`).
1. create a Personal Access Token (classic) in GitHub to allow packages to be published (`write:packages`). Put this in the repository action secrets under `PUBLISH_PACKAGES_TOKEN`. You will now have 2 Repository secrets.
1. in GitHub under Settings/Pages setup 'GitHub Pages' to be deployed by GitHub Actions. Then in Settings/Environments/github-page change the 'Deployment Branches' from 'Selected branches and tags' to 'No restriction'.
1. Write and test your code:
    - install types depending on your target eg. `> npm install @types/node --save-dev` or `> npm install @types/web --save-dev`
    - edit/replace/remove the `./src/add.ts` and `./src/subtract.ts` files with the functionality you require
    - edit `./index.ts` to export your new functionality
    - replace test files in `./tests` with your own tests
    - update README.md to reflect your functionality - remove explanation regarding the template and use the `Install` and subsequent sections as guidance for your documenting package
1. Delete this "How to setup a package from this template" section (these instructions for using the template). 
1. Commit, Push and Release your package (see the steps set out in the Development section in `CONTRIBUTING.md`)

---
<!-- ... down to here. -->
# Template ESM Typescript library

A template used for projects which produce both CommonJS and ESM packages from a common Typescript ESM codebase.

Includes testing, coverage, coveralls.io, linting, TSDoc and auto creation of a package on creating a github release.

If you are creating a new project from this template, instructions are [here](./INSTRUCTIONS.md).

[![Typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF)](https://www.typescriptlang.org/)
[![Node.js CI](https://github.com/x-ware-ltd/template-typescript-node-library/actions/workflows/linux-ci.yml/badge.svg)](https://github.com/x-ware-ltd/template-typescript-node-library/actions/workflows/linux-ci.yml)
[![Node.js CI](https://github.com/x-ware-ltd/template-typescript-node-library/actions/workflows/windows-ci.yml/badge.svg)](https://github.com/x-ware-ltd/template-typescript-node-library/actions/workflows/windows-ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/x-ware-ltd/template-typescript-node-library/badge.svg?branch=main)](https://coveralls.io/github/x-ware-ltd/template-typescript-node-library?branch=main)

## Install

This is a github hosted package so you need to add an entry to your `.npmrc` file so the package manager knows where to download the package from:
        
```ini
@x-ware-ltd:registry=https://npm.pkg.github.com
```
Then:

```console
> npm install @x-ware-ltd/template-typescript-node-library
```

If the package is `private` you need to authenticate to github by getting a Personal Access Token from github with `read:packages` permissions. Either login for the session, which will request your github username, and password (use your Personal Access Token):
```console
> npm login --scope=@x-ware-ltd --registry=https://npm.pkg.github.com
```

Or, create a personal `.npmrc` file in your home directory:
```ini
//npm.pkg.github.com/:_authToken=aaa_abcDeFghIjklMNopqRSTuvWXYz
```

If you are running CI/CD on your package you will need to provide credentials for the server. Save a Personal Access Token in your Github secrets and in your github actions:
```
- name: Authenticate private github packages
  run: echo "//npm.pkg.github.com/:_authToken=${{ secrets.PACKAGE_READ_TOKEN }}" > ~/.npmrc
```

## Features

- Works with CommonJS and ESM
- Provides Typescript types

## Usage
ESM:
```js
import {add} from '@x-ware-ltd/template-typescript-node-library';

console.log(add(3, 5)); // 8
```

CommonJS:
```js
var lib = require('@x-ware-ltd/template-typescript-node-library');

console.log(lib.add(3, -1)); // 2
```

## API Reference

Documentation can be found at:

- [add](https://x-ware-ltd.github.io/template-typescript-node-library/docs/functions/add.html)
- [subtract](https://x-ware-ltd.github.io/template-typescript-node-library/docs/functions/subtract.html)

## Contributing

Make sure your code passes testing, and create a Pull Request
```console
> npm test
```