'use strict'

/**
 * build a response
 * @param {number} status_code
 * @param {object} body
 */

function buildResponse(status_code, body, cors) {
    let response = {
        statusCode: status_code,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    }
    if (cors) {
        response.headers['Access-Control-Allow-Origin'] = '*'
    }
    return response
}

class Response {
    constructor(response, cloud = 'aws') {
        this.body = {}
        this.cors = true
        this.cloud = cloud
        this.complete = false
        this.response = response || {}
        this.status_sode = 200
    }

    set(body, status_sode) {
        this.body = body || {}
        this.status_sode = status_sode || 200
        this.complete = true
        return this
    }

    isComplete() {
        return !!this.complete
    }

    json() {
        if (this.cloud === 'aws') {
            this.response(null, Response.json(this.status_sode, this.body, this.cors))
        }
        if (this.cloud === 'gcp') {
            if (this.cors) {
                this.response.setHeader('Access-Control-Allow-Origin', '*')
            }
            this.response.setHeader('Content-Type', 'application/json;charset=utf-8')
            this.response.status(this.status_sode).send(JSON.stringify(this.body))
        }
        if (this.cloud === 'azure') {
            this.response.res = {
                body: JSON.stringify(this.body),
                status: this.status_sode,
                headers: {
                    'Content-Type' : 'application/json'
                }
            }
            if (this.cors) {
                this.response.res.headers['Access-Control-Allow-Origin'] = '*'
            }
            this.response.done()
        }
    }

    // body = { message: string, count: int, data: array }｛
    // message and data are required
    static success(body, { cors = true } = {}) {
        return buildResponse(200, body, cors)
    }

    // body = { errorMessage: string, errorCode: string }
    // errorMessage and errorCode are required
    static badRequest(body, { cors = true } = {}) {
        return buildResponse(400, body, cors)
    }

    // body = { errorMessage: string, errorCode: string }
    // errorMessage and errorCode are required
    static unauthorized(body, { cors = true } = {}) {
        return buildResponse(401, body, cors)
    }

    // body = { errorMessage: string, errorCode: string }
    // errorMessage and errorCode are required
    static forbidden(body, { cors = true } = {}) {
        return buildResponse(403, body, cors)
    }

    // body = { errorMessage: string, errorCode: string }
    // errorMessage and errorCode are required
    static notFound(body, { cors = true } = {}) {
        return buildResponse(404, body, cors)
    }

    // body = { errorMessage: string, errorCode: string }
    // errorMessage and errorCode are required
    static unprocessable(body, { cors = true } = {}) {
        return buildResponse(422, body, cors)
    }

    // body = { errorMessage: string, errorCode: string }
    // errorMessage and errorCode are required
    static internalError(body, { cors = true } = {}) {
        return buildResponse(500, body, cors)
    }

    // body = { errorMessage: string, errorCode: string }
    // errorMessage and errorCode are required
    static customize(body, status_code, { cors = true } = {}) {
        return buildResponse(status_code, body, cors)
    }

    static json(body, status_code, { cors = true } = {}) {
        return buildResponse(status_code, body, cors)
    }

}

module.exports = Response
