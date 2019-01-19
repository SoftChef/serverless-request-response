'use strict'

class Request {
    constructor(request, cloud = 'aws') {
        this.request = request
        this.cloud = cloud
        this.body = {}
        this.query = {}
        this.params = {}
        this.parseRequest()
    }

    parseRequest() {
        switch(this.cloud) {
            case 'aws':
                this.parseRequestAWS()
                break
            case 'gcp':
                this.parseRequestGCP()
                break
            default:
                this.parseRequestAZURE()
                break
        }
    }

    parseRequestAWS() {
        this.query = this.request.queryStringParameters || {}
        this.params = this.request.pathParameters || {}
        try {
            this.body = JSON.parse(this.request.body || {})
        } catch (exception) {
            this.body = {}
        }
    }

    parseRequestGCP() {
        this.body = this.request.body || {}
        this.query = (require('url')).parse(this.request.url, true).query
    }

    parseRequestAZURE() {
        this.body = this.request.body || {}
        this.query = this.request.query || {}
        this.params = this.request.params || {}
    }

    all() {
        let target = Object.assign({}, this.query)
        return Object.assign(target, this.body)
    }

    get(name, default_value) {
        return this.query[name] || default_value || null
    }

    input(name, default_value) {
        if (name == null) {
            return this.body
        }
        return this.body[name] || default_value || null
    }

    params(name) {
        return this.params[name] || null
    }

    user() {
        if (this.cloud === 'aws') {
            let authorizer = (this.request.requestContext || {}).authorizer || {}
            let user = authorizer.claims || null
            if (user) {
                user.id = user.sub
            }
            return user
        } else {
            throw new Error('User only support aws cloud.')
        }
    }
}

module.exports = Request
