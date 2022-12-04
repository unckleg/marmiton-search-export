module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
    'no-relative-import-paths',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "prettier/prettier": "error",

    'no-empty': 'off',
    'no-constant-condition': 'off',
    
    '@typescript-eslint/naming-convention': ['error',
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'custom': {
          'regex': '^I[A-Z]',
          'match': true
        }
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    
    '@typescript-eslint/semi': ['error'],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'curly': 'error',

    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'always-multiline'
    }],

    'no-console': 1,

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    "arrow-body-style": ["error", "always"],
    "arrow-parens": ["error", "always"],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "block-spacing": ["error", "always"],

    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],

    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { "allowSameFolder": true }
    ]
  },
};
