module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  rules: {
    // '@typescript-eslint/no-explicit-any': 'off',
  },
};
