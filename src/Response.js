'use strict'

/**
 * build a response
 * @param {number} status_code
 * @param {object} body
 */
const buildResponse = (status_code, body, cors) => {
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

// body = { message: string, count: int, data: array }
// message and data are required
const success = (body, { cors = true } = {}) => {
    return buildResponse(200, body, cors)
}

// body = { errorMessage: string, errorCode: string }
// errorMessage and errorCode are required
const badRequest = (body, { cors = true } = {}) => {
    return buildResponse(400, body, cors)
}

// body = { errorMessage: string, errorCode: string }
// errorMessage and errorCode are required
const unauthorized = (body, { cors = true } = {}) => {
    return buildResponse(401, body, cors)
}

// body = { errorMessage: string, errorCode: string }
// errorMessage and errorCode are required
const forbidden = (body, { cors = true } = {}) => {
    return buildResponse(403, body, cors)
}

// body = { errorMessage: string, errorCode: string }
// errorMessage and errorCode are required
const notFound = (body, { cors = true } = {}) => {
    return buildResponse(404, body, cors)
}

// body = { errorMessage: string, errorCode: string }
// errorMessage and errorCode are required
const unprocessable = (body, { cors = true } = {}) => {
    return buildResponse(422, body, cors)
}

// body = { errorMessage: string, errorCode: string }
// errorMessage and errorCode are required
const internalError = (body, { cors = true } = {}) => {
    return buildResponse(500, body, cors)
}

// body = { errorMessage: string, errorCode: string }
// errorMessage and errorCode are required
const customize = (body, status_code, { cors = true } = {}) => {
    return buildResponse(status_code, body, cors)
}

const json = (body, status_code, { cors = true } = {}) => {
    return buildResponse(status_code, body, cors)
}

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    unprocessable,
    internalError,
    customize,
    json
}
