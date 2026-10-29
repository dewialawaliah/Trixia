module.exports = [
    {
        files: ['server/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'commonjs',
            globals: {
                require: 'readonly', module: 'readonly', process: 'readonly', __dirname: 'readonly',
                console: 'readonly', Buffer: 'readonly', AbortSignal: 'readonly', fetch: 'readonly', URL: 'readonly'
            }
        },
        rules: {
            'no-undef': 'error',
            'no-unreachable': 'error'
        }
    }
];
