const { Request } = require('../src')
const assert = require('assert')

const fake_event = {
    pathParameters: {
        id: 123
    },
    queryStringParameters: {
        search: 'keyword'
    },
    body: JSON.stringify({
        name: 'Josh Chai',
        visiable: true,
        block: false
    }),
    requestContext: {
        authorizer: {
            claims: {
                id: 1,
                sub: 1
            }
        }
    }
}
const request = new Request(fake_event)

describe('Request', () => {
    describe('params()', () => {
        it('should return "123" about parameter "id"', () => {
            assert.strictEqual(request.params('id'), 123)
        })
    })
    describe('get()', () => {
        it('should return "keyword" when the search', () => {
            assert.strictEqual(request.get('search'), 'keyword')
        })
        it('should return "10" when the limit\'s default value', () => {
            assert.strictEqual(request.get('limit', 10), 10)
        })
    })
    describe('input()', () => {
        it('should return "Josh Chai" when input the name', () => {
            assert.strictEqual(request.input('name'), 'Josh Chai')
        })
        it('should return true when input the visiable\'s default value', () => {
            assert.strictEqual(request.input('visiable', true), true)
        })
        it('should return false when input the block\'s default value', () => {
            assert.strictEqual(request.input('block', false), false)
        })
    })
    describe('user()', () => {
        it('should return 1 when user has been access', () => {
            let user = request.user()
            assert.strictEqual(user.id, 1)
            assert.strictEqual(user.sub, 1)
        })
    })
})
