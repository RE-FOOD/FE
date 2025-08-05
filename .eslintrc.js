module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier', // prettier와 충돌 방지: extends 마지막 줄 유지
  ],
  plugins: ['import', '@typescript-eslint', 'react-hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react-native/no-inline-styles': 'off',
    'react/react-in-jsx-scope': 'off',

    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // TypeScript
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/namespace': 'off',
    'import/no-named-as-default': 'off',

    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',

    'import/order': [
      'error',
      {
        pathGroups: [
          { pattern: 'react*', group: 'builtin', position: 'before' },
          { pattern: 'react-native', group: 'external', position: 'after' },
          { pattern: '@src/**', group: 'external', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc' },
      },
    ],

    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        printWidth: 100,
        arrowParens: 'always',
        bracketSpacing: true,
        bracketSameLine: false,
        endOfLine: 'auto',
      },
    ],
  },
  ignorePatterns: ['node_modules/', 'babel.config.js'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
};
