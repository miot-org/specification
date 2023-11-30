import {JSONSchema4} from 'json-schema';

const V1_0_0: JSONSchema4 = {
  title: 'Ortac Locale Object V1_0_0',
  description: 'Full Schema describing the format of the Ortac locale JSON file',
  type: 'object',
  additionalProperties: false,
  required: ['fileFormat', 'author', 'subject', 'version', 'locales'],
  properties: {
    fileFormat: {
      title: 'locale file format',
      type: 'object',
      additionalProperties: false,
      required: ['name', 'version'],
      properties: {
        name: {
          type: 'string',
          pattern: 'ortac-locale',
        },
        version: {
          type: 'string',
          pattern: '1.0.0',
        },
      },
    },
    author: {
      type: 'string',
    },
    subject: {
      type: 'string',
    },
    version: {
      type: 'string',
      pattern: '^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)$',
    },
    locales: {
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '^[a-z]{2,4}(-[A-Z][a-z]{3})?(-([A-Z]{2}|[0-9]{3}))?|/*$': {
          type: 'object',
          additionalProperties: false,
          properties: {
            parent: {
              type: 'string',
              pattern: '^[a-z]{2,4}(-[A-Z][a-z]{3})?(-([A-Z]{2}|[0-9]{3}))?$',
            },
            phrases: {
              type: 'object',
              additionalProperties: false,
              patternProperties: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                '^_.*$': {
                  type: 'string',
                },
              },
            },
            displaySpecs: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['manufacturer'],
                properties: {
                  manufacturer: {
                    type: 'string',
                  },
                  components: {
                    type: 'object',
                    additionalProperties: false,
                    patternProperties: {
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      '^.*$': {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                          specifications: {$ref: '#/$defs/specification'},
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  $defs: {
    specification: {
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '^.*$$': {
          type: 'object',
          additionalProperties: false,
          patternProperties: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '^_qty.*$': {
              type: 'object',
              additionalProperties: false,
              properties: {
                display: {
                  $ref: '#/$defs/display',
                },
              },
            },
          },
        },
      },
    },
    display: {
      type: 'object',
      additionalProperties: false,
      properties: {
        what: {type: 'string'},
        unit: {type: 'string'},
        decimalPlaces: {type: 'integer'},
        min: {type: 'number'},
        max: {type: 'number'},
        errorLow: {type: 'number'},
        errorHigh: {type: 'number'},
        exponent: {
          oneOf: [{
            type: 'number',
          }, {
            type: 'string',
            pattern: '^log$',
          }],
        },
        alertLower: {type: 'number'},
        warnLower: {type: 'number'},
        nominalMin: {type: 'number'},
        nominalMax: {type: 'number'},
        warnUpper: {type: 'number'},
        alertUpper: {type: 'number'},
      },
    },
  },
};

export const locale = {
  V1_0_0,
};
