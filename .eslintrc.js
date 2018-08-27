module.exports = {
    extends: 'standard',
    env: {
        mocha: true
    },
    rules: {
        indent: 0,
        camelcase: [0, {
            properties: 'never',
            ignoreDestructuring: true
        }],
        'space-before-function-paren': ['error', 'never']
    }
}