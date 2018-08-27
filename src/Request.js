'use strict'

class Request {
    constructor(event) {
        this.event = event
    }
    params(name) {
        return this.event.pathParameters[name] || null
    }
    get(name, default_value) {
        return this.event.queryStringParameters[name] || default_value || null
    }
    input(name, default_value) {
        if (!this.body) {
            try {
                this.body = JSON.parse(this.event.body)
            } catch (exception) {
                this.body = {}
            }
        }
        if (name === undefined) {
            return this.body
        }
        let result = this.body[name] || default_value
        return result !== undefined ? result : null
    }
    user() {
        let authorizer = (this.event.requestContext || {}).authorizer || {}
        let user = authorizer.claims || null
        if (user) {
            user.id = user.sub
        }
        return user
    }
}

module.exports = Request
