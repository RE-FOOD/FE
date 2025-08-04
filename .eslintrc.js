module.exports = {
  root: true,
  extends: [
    '@react-native', // RN 기본 룰
    'plugin:@typescript-eslint/recommended', // TS 기본 추천
    'plugin:react-hooks/recommended', // Hooks 규칙
    'prettier', // prettier와 충돌 방지
  ],
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {jsx: true},
    project: './tsconfig.json',
  },
  rules: {
    'react-native/no-inline-styles': 'off', // 인라인 스타일 허용
    'react/react-in-jsx-scope': 'off', // RN에선 불필요

    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // TypeScript
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    '@typescript-eslint/no-explicit-any': 'warn',

    // 코드 품질
    'no-console': ['warn', {allow: ['warn', 'error']}],
    'no-debugger': 'error',

    // Prettier
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
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
