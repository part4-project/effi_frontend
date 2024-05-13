module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'eslint-plugin-import'],
  // 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

  rules: {
    'no-var': 'error', // var 금지
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }], // console.log() 금지
    // 'eqeqeq': 'error', // 일치 연산자 사용 필수
    'no-unused-vars': 'error', // 사용하지 않는 변수 금지
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'type'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@**/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@**/*.style',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/*.style',
            group: 'internal',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
