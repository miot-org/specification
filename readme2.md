# Ortac Specification - Repository Functional Description

This project is the authoritative source of the Ortac specification but it also produces supporting files and code for use with the specification.

## The Specification

This consists of:
-  the core specification document located at [./src/specification/ortac-specification.md](./src/specification/ortac-specification.md)
- json schemas located at [./src/schemas](]./src/schemas]) which describe the format of json files used in the specification and include the schemas used by the resource service restful API
- the resources (json) file which contains the definitive list of quantities, kinds, contexts and instances as described in the specification. Note that this is actually stored in YAML files, and the lists within the documentation are built from these YAML files.

## Typescript

From the json schemas the following Typescript code is built and published on npm at [@ortac/specification](https://www.npmjs.com/search?q=%40ortac). It can be used to help with developing ortac code in typescript. They are released in both esm and cjs flavours. 

### Type Guards

A set of typescript type guards which provide testing against the json schemas defined in the specification.

### Validators

A set of validators which validate against the json schemas defined in the specification. The validators will throw an error along with an explanation is the supplied object does not validate.

### Resource Types

These are Typescript interface descriptions which can be used in code

## Releases

From the specification a set of the schema and json files is published on github releases. These are publicly accessible including all previous release versions. These files are used by third parties to implement ortac devices. These include the resources and language files.

## Documentation

Typedoc is used to produce documentation which is published using github-pages at [https://ortac-org.github.io/specification/docs/modules.html](https://ortac-org.github.io/specification/docs/modules.html).

## Website

In the ./wwww folder there is the ortac.org website. For the time being this is published using github pages and is available at [https://ortac-org.github.io/specification](https://ortac-org.github.io/specification) or [www.ortac.org](www.ortac.org)

## Tests

Automated tests `npm test` run a spellchecker across the repository and also check that all the schema and json (yaml) files are valid and coherent. It also produces a coverage report which is published to coveralls at [https://coveralls.io/github/ortac-org/specification](https://coveralls.io/github/ortac-org/specification).

## Continuous Integration

github workflows are used to perform continuous integration, publish the website and documentation onto github-pages and to post test coverage results to coveralls.

## Scripts

`npm test`: runs all the tests including the spellcheck
`npm run build`: builds all the items details above with the exception of the Typedoc documentation
`npm run docs`: builds the typedoc documentation
`npm run prepare`: runs the test, build and docs scripts
`npm run clean`: deletes all files and folders which have been created or build in order to facilitate publishing
