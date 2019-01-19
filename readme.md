# serverless-request-response

## 簡介
在Serverless framework中, 你經常會需要處理透過API輸入的資料, 包含Params(Path), Query String(Get), Input(Post)等情況, 並且檢查是否存在以及處理預設值. 當程序結束前必須回應各種不同狀態碼(Http Status Code)的訊息, 因此這個套件將有效的幫助你處理各種情況.

> 目前支援 aws, gcp, azure 三種環境，預設值為 aws

## Installation

```
npm install serverless-request-response
```

## Examples

### Cloud

#### AWS Lambda

```js
const { Request, Response } = require('serverless-request-response')
exports.handler = async(event, context, callback) => {
    let request = new Request(event)
    let response = new Response(callback)
    response.set({ message: 'hello world.' }, 200).json()
}
```

#### GCP Functions

```js
const { Request, Response } = require('serverless-request-response')
exports.helloWorld = (req, res) => {
    let request = new Request(req, 'gcp')
    let response = new Response(res, 'gcp')
    response.set({ message: 'hello world.' }, 200).json()
}
```

#### AZURE Functions

```js
const { Request, Response } = require('serverless-request-response')
exports.helloWorld = async function(context, req) {
    let request = new Request(req, 'azure')
    let response = new Response(context, 'azure')
    response.set({ message: 'hello world.' }, 200).json()
}
```

### Request

#### GET

> Example URL: GET /taxonomies/123/articles?search=keyword

```js
let taxonomy_id = request.params('taxonomy_id') // Param not support gcp.
let search = request.get('search')
let cond1 = request.get('cond1', '123')
// taxonomy_id = 123
// search = 'keyword'
// cond1 = 123 ( cond1 not assigned, use default value )
```

#### POST

> Example URL: POST /articles

> Post data { subject: 'New Subject', content: 'New Content' }

```js
let subject = request.input('subject')
let content = request.input('content')
let visiable = request.input('visiable', false)
// subject = 'New Subject'
// content = 'New Content'
// visiable = false ( visiable not assigned, use default value )
```

#### Other

```js
// Get all query strings and post data
let all = request.all()
// Get User ( if user has authorized from cognito, only aws )
let user = request.user() || {}
let user_id = user.id || null
```

### Response

```js
response.set({ message: 'hello world.' }, 200)
response.isComplete() // true
response.json() //Send action
```

#### 靜態訊息

可以使用靜態訊息回傳API Getway所要求的Response

```js
Response.json({ message: 'ok'}, 200) // status code is 200 
Response.success({ message: 'ok' }) // status code is 200
Response.badRequest({ error: 'Bad request' }) // status code is 400
Response.unauthorized({ error: 'Unauthorized' }) // status code is 401
Response.forbidden({ error: 'Forbidden' }) // status code is 403
Response.notFound({ error: 'Not found' }) // status code is 404
Response.unprocessable({ error: 'Field name is required' }) // status code is 422
Response.internalError({ error: 'Internal error' }) // status code is 500
Response.customize({ error: 'custom error' }, 503) // status code is 503 
```

## License

This SDK is distributed under the GNU GENERAL PUBLIC LICENSE Version 3, see LICENSE for more information.