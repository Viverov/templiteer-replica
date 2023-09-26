module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'unused-imports',
    'node',
    'prettier',
    'ban',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    'unused-imports/no-unused-imports': 'error',
    'prettier/prettier': ['error', {
      "singleQuote": true,
      "printWidth": 120,
      "trailingComma": "all",
      "tabWidth": 4,
    }],
    'ban/ban': [
      'error',
      {
          name: 'Controller',
          message: 'Prefer our version "ExtendedController" (@libs/nest/ExtendedController) instead',
      },
      {
          name: ['it', 'only'],
          message: 'it.only can be used only in development',
      },
      {
          name: ['describe', 'only'],
          message: 'describe.only can be used only in development',
      },
      {
          name: ['test', 'only'],
          message: 'test.only can be used only in development',
      },
    ],

    // -------------- Conflict rules section
    'no-use-before-define': ['off'],
    'no-undef': 'off',

    // ----------- strict rules section ---------- (full list: https://eslint.org/docs/rules/)
    'constructor-super': 'error',
    'for-direction': 'error',
    'getter-return': 'error',
    'no-async-promise-executor': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-const-assign': 'error',
    'no-constant-condition': 'off',
    'no-constructor-return': 'error',
    'no-control-regex': 'off',
    'no-debugger': 'off',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'off', // conflict
    'no-dupe-else-if': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'off', // conflict
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-ex-assign': 'error',
    'no-fallthrough': 'error',
    'no-func-assign': 'error',
    'no-import-assign': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': [
      'error',
      {
        skipComments: true,
        skipStrings: false,
        skipTemplates: true,
        skipRegExps: true,
      },
    ],
    'no-loss-of-precision': 'off', // conflict
    'no-misleading-character-class': 'error',
    'no-new-symbol': 'error',
    'no-obj-calls': 'error',
    'no-promise-executor-return': 'off',
    'no-prototype-builtins': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-setter-return': 'error',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'off',
    'no-this-before-super': 'error',
    // 'no-undef': 'error', -- conflict, check first rules section
    'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'off',
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-unused-private-class-members': 'error',
    'no-unused-vars': 'off', // conflict
    'no-useless-backreference': 'error',
    'require-atomic-updates': 'off',
    'use-isnan': 'error',
    'valid-typeof': 'error',

    // Suggests
    'accessor-pairs': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'block-scoped-var': 'error',
    // 'camelcase': 'off', -- use NamingConvention instead
    'capitalized-comments': 'off',
    'class-methods-use-this': 'off',
    complexity: ['error', 10],
    'consistent-return': 'error',
    'consistent-this': 'error',
    curly: ['error', 'multi-line', 'consistent'],
    'default-case': 'error',
    'default-case-last': 'error',
    'default-param-last': 'off', // conflict
    'dot-notation': 'off', // conflict
    eqeqeq: 'error',
    'func-name-matching': 'off',
    'func-names': ['error', 'as-needed'],
    'func-style': 'off',
    'grouped-accessor-pairs': 'off',
    'guard-for-in': 'off',
    'id-denylist': 'off',
    'id-length': 'off',
    'id-match': 'off',
    'init-declarations': 'off', // conflict
    'max-classes-per-file': 'off',
    'max-depth': ['error', 4],
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-nested-callbacks': ['error', 10],
    'max-params': ['error', 5],
    'max-statements': 'off',
    'multiline-comment-style': ['error', 'separate-lines'],
    'new-cap': 'off',
    'no-alert': 'error',
    'no-array-constructor': 'off', // conflict
    'no-bitwise': 'off',
    'no-caller': 'error',
    'no-case-declarations': 'off',
    'no-confusing-arrow': 'off', // disabled by conflict with prettier
    'no-console': 'warn',
    'no-continue': 'off',
    'no-delete-var': 'error',
    'no-else-return': 'off',
    'no-empty': 'warn',
    'no-empty-function': 'off', // conflict
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-label': 'error',
    'no-extra-semi': 'off', // conflict
    'no-floating-decimal': 'error',
    'no-global-assign': 'error',
    'no-implicit-coercion': 'off',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'off', // conflict
    'no-inline-comments': 'off',
    'no-invalid-this': 'off', // conflict
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'off', // conflict
    // 'no-magic-numbers': ["error", { "ignore": [-1, 0, 1, 2, 3, 4, 5, 6 , 7, 8, 9, 10], ignoreArrayIndexes: true, ignoreDefaultValues: true, enforceConst: true, detectObjects: true }], -- broken. Resolve `const MAX_TEMPLATE_SIZE = 1024 * 1024 * 50;` as magic number. and conflict
    'no-mixed-operators': 'off',
    'no-multi-assign': 'error',
    'no-multi-str': 'off',
    'no-negated-condition': 'off',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-nonoctal-decimal-escape': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': 'off',
    'no-proto': 'error',
    'no-redeclare': 'off', // conflict
    'no-regex-spaces': 'error',
    'no-restricted-exports': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-imports': 'off', // conlict
    'no-restricted-properties': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-script-url': 'off',
    'no-sequences': 'error',
    'no-shadow': 'off', // conflict
    'no-shadow-restricted-names': 'error',
    'no-ternary': 'off',
    'no-throw-literal': 'off', // conflict
    'no-undef-init': 'error',
    'no-undefined': 'error',
    'no-underscore-dangle': 'off',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'off', // conflict
    'no-unused-labels': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'off', // conflict
    'no-useless-escape': 'error',
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': ['error', { allowAsStatement: true }],
    'no-warning-comments': 'off',
    'no-with': 'error',
    'object-shorthand': ['error', 'always'],
    'one-var': ['error', 'never'],
    'one-var-declaration-per-line': 'off',
    'operator-assignment': 'off',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'off',
    'prefer-exponentiation-operator': 'off',
    'prefer-named-capture-group': 'off',
    'prefer-numeric-literals': 'off',
    'prefer-object-spread': 'error',
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    'prefer-regex-literals': 'off',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'off',
    'quote-props': ['error', 'as-needed'],
    radix: 'off',
    'require-await': 'off', // conflict
    'require-unicode-regexp': 'off',
    'require-yield': 'off',
    'sort-imports': 'off',
    'sort-keys': 'off',
    'sort-vars': 'off',
    'spaced-comment': ['error', 'always', { exceptions: [] }],
    strict: ['error', 'never'],
    'symbol-description': 'error',
    'vars-on-top': 'off',
    yoda: 'error',

    // format section // disabled by prettier
    // 'array-bracket-newline': ['error', { multiline: true }],
    // 'array-bracket-spacing': ['error', 'never'],
    // 'array-element-newline': ['error', 'consistent', { multiline: true }],
    // 'arrow-parens': ['error', 'always'],
    // 'arrow-spacing': 'error',
    // 'block-spacing': 'error',
    // 'brace-style': 'off', // Conflict
    // 'comma-dangle': 'off', // Conflict
    // 'comma-spacing': ['error', { before: false, after: true }],
    // 'comma-style': ['error', 'last'],
    // 'computed-property-spacing': ['error', 'never'],
    // 'dot-location': ['error', 'property'],
    // 'eol-last': ['error', 'always'],
    // 'func-call-spacing': 'off', // conflict
    // 'function-call-argument-newline': ['error', 'consistent'],
    // 'function-paren-newline': 'off',
    // 'generator-star-spacing': ['error', { before: false, after: true }],
    // 'implicit-arrow-linebreak': 'off',
    // intent: 'off',
    // 'key-spacing': ['error', { mode: 'strict' }],
    // 'keyword-spacing': 'off', // conflict
    // 'line-comment-position': 'off',
    // 'linebreak-style': ['error', 'unix'],
    // 'lines-around-comment': 'off',
    // 'lines-between-class-members': 'off', // conflict
    // 'max-len': ['error', { code: 120, tabWidth: 4, ignoreComments: true }],
    // 'max-statements-per-line': 'off',
    // 'multiline-ternary': ['error', 'always-multiline'],
    // 'new-parens': 'error',
    // 'newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
    // 'no-extra-parens': 'off', // conflict
    // 'no-mixed-spaces-and-tabs': 'error',
    // 'no-multi-spaces': 'error',
    // 'no-multiple-empty-lines': 'error',
    // 'no-tabs': 'error',
    // 'no-trailing-spaces': ['error', { skipBlankLines: true }],
    // 'no-whitespace-before-property': 'error',
    // 'nonblock-statement-body-position': ['error', 'any'],
    // 'object-curly-newline': ['error', { consistent: true }],
    // 'object-curly-spacing': 'off', // conflict
    // 'object-property-newline': 'off',
    // 'operator-linebreak': [
    //     'error',
    //     'after',
    //     { overrides: { '?': 'before', ':': 'before' } },
    // ],
    // 'padded-blocks': ['error', 'never'],
    // 'padding-line-between-statements': 'off', // conflict
    // quotes: 'off', // conflict
    // 'rest-spread-spacing': ['error', 'never'],
    // semi: 'off', // conflict
    // 'semi-spacing': 'error',
    // 'semi-style': ['error', 'last'],
    // 'space-before-blocks': 'error',
    // 'space-before-function-paren': 'off', // conflict
    // 'space-in-parens': ['error', 'never'],
    // 'space-infix-ops': 'off', // conflict
    // 'space-unary-ops': 'error',
    // 'switch-colon-spacing': 'error',
    // 'template-curly-spacing': ['error', 'never'],
    // 'unicode-bom': ['error', 'never'],
    // 'wrap-iife': ['error', 'any'],
    // 'wrap-regex': 'off',
    // 'yield-star-spacing': ['error', 'after'],

    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
        readonly: 'array',
      },
    ],
    '@typescript-eslint/await-thenable': 'off', // broken
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
    '@typescript-eslint/consistent-indexed-object-style': [
      'error',
      'index-signature',
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'angle-bracket',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-exports': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: false,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: false,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
    // "@typescript-eslint/explicit-module-boundary-types": ["error", {
    //   allowArgumentsExplicitlyTypedAsAny: true,
    //   allowDirectConstAssertionInArrowFunctions: true,
    //   allowedNames: [],
    //   allowHigherOrderFunctions: true,
    //   allowTypedFunctionExpressions: true,
    // }],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      },
    ],
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    // "@typescript-eslint/naming-convention": ["error",
    //   {
    //     "selector": "default",
    //     "format": ["camelCase"]
    //   },
    //   {
    //     "selector": "variable",
    //     "format": ["camelCase", "UPPER_CASE"]
    //   },
    //   {
    //     'selector': "property",
    //     "format": ["camelCase", 'snake_case', "UPPER_CASE"],
    //   },
    //   {
    //     "selector": "parameter",
    //     "format": ["camelCase"],
    //     "leadingUnderscore": "allow"
    //   },
    //   {
    //     "selector": "memberLike",
    //     "modifiers": ["private"],
    //     "format": ["camelCase"]
    //   },
    //
    //   {
    //     "selector": "typeLike",
    //     "format": ["PascalCase"]
    //   },
    //   {
    //     "selector": "enumMember",
    //     "format": ["PascalCase"]
    //   }
    // ],
    '@typescript-eslint/no-base-to-string': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': ['error'],
    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    // "@typescript-eslint/no-explicit-any": ["error", { // disabled due a lot of errors
    //   fixToUnknown: true,
    //   ignoreRestArgs: false,
    // }],
    '@typescript-eslint/no-explicit-any': 'off', // disabled due a lot of errors
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-extraneous-class': [
      'error',
      { allowWithDecorator: true, allowConstructorOnly: true },
    ],
    '@typescript-eslint/no-floating-promises': [
      'error',
      { ignoreVoid: true },
    ],
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/no-meaningless-void-operator': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off', // -- need `strictNullChecks` compiler options
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off', // disabled due a lot of errors
    '@typescript-eslint/no-unsafe-assignment': 'off', // disabled due a lot of errors
    '@typescript-eslint/no-unsafe-call': 'off', // disabled due a lot of errors
    '@typescript-eslint/no-unsafe-member-access': 'off', // disabled due a lot of errors
    '@typescript-eslint/no-unsafe-return': 'off', // disabled due a lot of errors
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/prefer-return-this-type': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-array-sort-compare': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off', // Can't check '' + number case
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/sort-type-union-intersection-members': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/type-annotation-spacing': ['error'],
    '@typescript-eslint/typedef': 'off',
    '@typescript-eslint/unbound-method': 'error',
    '@typescript-eslint/unified-signatures': 'off',

    // Conflicts!
    // '@typescript-eslint/brace-style': ["error", "1tbs", { "allowSingleLine": false }],// disabled by prettier
    // '@typescript-eslint/comma-dangle': ["error", "always-multiline"], // disabled by prettier
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
    '@typescript-eslint/indent': ['off'],
    '@typescript-eslint/init-declarations': ['off'],
    // '@typescript-eslint/keyword-spacing': ["error", { "before": true, 'after': true, }], // disabled by prettier
    // "@typescript-eslint/lines-between-class-members": "off", // disabled by prettier
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    // "@typescript-eslint/no-extra-parens": "off", // disabled by prettier
    '@typescript-eslint/no-extra-semi': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-loop-func': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-restricted-imports': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    // '@typescript-eslint/object-curly-spacing': ["error", "always"], // disabled by prettier
    // '@typescript-eslint/padding-line-between-statements': 'off', // disabled by prettier
    // '@typescript-eslint/quotes': ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }], // disabled by prettier
    '@typescript-eslint/require-await': 'off',
    // '@typescript-eslint/semi': 'error', // disabled by prettier
    // '@typescript-eslint/space-before-function-paren': ['error', { // disabled by prettier
    //   "anonymous": "never",
    //   "named": "never",
    //   'asyncArrow' : "always"
    // }],
    // '@typescript-eslint/space-infix-ops': 'error', // disabled by prettier
  },
};
