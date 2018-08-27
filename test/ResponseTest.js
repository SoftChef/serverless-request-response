const { Response } = require('../src')
const assert = require('assert')

describe('Response', () => {
    describe('success()', () => {
        it('should return "success" when response success', () => {
            let body = {
                message: 'ok'
            }
            let response = Response.success(body)
            assert.strictEqual(response.statusCode, 200)
            assert.strictEqual(response.body, JSON.stringify(body))
            assert.strictEqual(response.headers['Content-Type'], 'application/json;charset=utf-8')
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], '*')
        })
        it('should return "Undefined" when response success not cors', () => {
            let response = Response.success({}, { cors: false })
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], undefined)
        })
    })
    describe('badRequest()', () => {
        it('should return "badRequest" when response bad request', () => {
            let body = {
                error: 'Bad request'
            }
            let response = Response.badRequest(body)
            assert.strictEqual(response.statusCode, 400)
            assert.strictEqual(response.body, JSON.stringify(body))
            assert.strictEqual(response.headers['Content-Type'], 'application/json;charset=utf-8')
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], '*')
        })
        it('should return "Undefined" when response bad request not cors', () => {
            let response = Response.badRequest({}, { cors: false })
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], undefined)
        })
    })
    describe('unauthorized()', () => {
        it('should return "unauthorized" when response unauthorized', () => {
            let body = {
                error: 'Unauthorized'
            }
            let response = Response.unauthorized(body)
            assert.strictEqual(response.statusCode, 401)
            assert.strictEqual(response.body, JSON.stringify(body))
            assert.strictEqual(response.headers['Content-Type'], 'application/json;charset=utf-8')
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], '*')
        })
        it('should return "Undefined" when response unauthorized not cors', () => {
            let response = Response.unauthorized({}, { cors: false })
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], undefined)
        })
    })
    describe('forbidden()', () => {
        it('should return "forbidden" when response forbidden', () => {
            let body = {
                error: 'Forbidden'
            }
            let response = Response.forbidden(body)
            assert.strictEqual(response.statusCode, 403)
            assert.strictEqual(response.body, JSON.stringify(body))
            assert.strictEqual(response.headers['Content-Type'], 'application/json;charset=utf-8')
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], '*')
        })
        it('should return "Undefined" when response forbidden not cors', () => {
            let response = Response.forbidden({}, { cors: false })
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], undefined)
        })
    })
    describe('notFound()', () => {
        it('should return "notFound" when response notFound', () => {
            let body = {
                error: 'Not found'
            }
            let response = Response.notFound(body)
            assert.strictEqual(response.statusCode, 404)
            assert.strictEqual(response.body, JSON.stringify(body))
            assert.strictEqual(response.headers['Content-Type'], 'application/json;charset=utf-8')
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], '*')
        })
        it('should return "Undefined" when response notFound not cors', () => {
            let response = Response.notFound({}, { cors: false })
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], undefined)
        })
    })
    describe('unprocessable()', () => {
        it('should return "unprocessable" when response unprocessable', () => {
            let body = {
                error: 'Field name is required'
            }
            let response = Response.unprocessable(body)
            assert.strictEqual(response.statusCode, 422)
            assert.strictEqual(response.body, JSON.stringify(body))
            assert.strictEqual(response.headers['Content-Type'], 'application/json;charset=utf-8')
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], '*')
        })
        it('should return "Undefined" when response unprocessable not cors', () => {
            let response = Response.unprocessable({}, { cors: false })
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], undefined)
        })
    })
    describe('internalError()', () => {
        it('should return "internalError" when response internalError', () => {
            let body = {
                error: 'Internal error'
            }
            let response = Response.internalError(body)
            assert.strictEqual(response.statusCode, 500)
            assert.strictEqual(response.body, JSON.stringify(body))
            assert.strictEqual(response.headers['Content-Type'], 'application/json;charset=utf-8')
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], '*')
        })
        it('should return "Undefined" when response internalError not cors', () => {
            let response = Response.internalError({}, { cors: false })
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], undefined)
        })
    })
    describe('customize()', () => {
        it('should return "customize" when response customize', () => {
            let body = {
                error: 'Custom error'
            }
            let response = Response.customize(body, 501)
            assert.strictEqual(response.statusCode, 501)
            assert.strictEqual(response.body, JSON.stringify(body))
            assert.strictEqual(response.headers['Content-Type'], 'application/json;charset=utf-8')
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], '*')
        })
        it('should return "Undefined" when response customize not cors', () => {
            let response = Response.customize({}, 501, { cors: false })
            assert.strictEqual(response.headers['Access-Control-Allow-Origin'], undefined)
        })
    })
})
