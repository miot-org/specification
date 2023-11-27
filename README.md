# Ortac Specification

This project sets out the Ortac specification and exports various components which form part of the specification into both both CommonJS and ESM packages from a common Typescript ESM codebase.

Includes testing, coverage, coveralls.io, linting, TSDoc and auto creation of a package on creating a github release.

[![Typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF)](https://www.typescriptlang.org/)
[![Node.js CI](https://github.com/ortac-org/specification/actions/workflows/linux-ci.yml/badge.svg)](https://github.com/ortac-org/specification/actions/workflows/linux-ci.yml)
[![Node.js CI](https://github.com/ortac-org/specification/actions/workflows/windows-ci.yml/badge.svg)](https://github.com/ortac-org/specification/actions/workflows/windows-ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/ortac-org/specification/badge.svg?branch=main)](https://coveralls.io/github/ortac-org/specification?branch=main)

## Install

```console
> npm install @ortac/specification
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

- [add](https://ortac-org.github.io/specification/docs/functions/add.html)
- [subtract](https://ortac-org.github.io/specification/docs/functions/subtract.html)

## Contributing

Make sure your code passes testing, and create a Pull Request
```console
> npm test
```