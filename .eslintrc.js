module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        jsx: true,
        useJSXTextNode: true,
    },
    env: {
        browser: true,
        jasmine: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    plugins: ['@typescript-eslint'],
    rules: {
        'quotes': ['error', 'single', { avoidEscape: true }],
        'require-atomic-updates': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'camelcase': 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                jsxSingleQuote: true,
                semi: false,
                trailingComma: 'es5',
                tabWidth: 4,
                useTabs: false,
                quoteProps: 'consistent',
                parser: 'typescript',
                bracketSpacing: true,
                printWidth: 120,
            },
        ],
    },
}
