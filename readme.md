# serverless-request-response

## 簡介
在Serverless framework中, 你經常會需要處理透過API輸入的資料, 包含Params(Path), Query String(Get), Input(Post)等情況, 並且檢查是否存在以及處理預設值. 當程序結束前必須回應各種不同狀態碼(Http Status Code)的訊息, 因此這個套件將有效的幫助你處理各種情況.

## Installation

```
npm install serverless-request-response
```

## Examples

```
const { Request } = require('serverless-request-response')

exports.handler = async(event, context, callback) => {
    // Example URL: GET /taxonomies/123/articles?search="keyword"
    let request = new Request(event)
    let taxonomy_id = request.params('taxonomy_id')
    // taxonomy_id = 123
    let search = request.get('search')
    // search = 'keyword'
    let cond1 = request.get('cond1', null)
    // cond1 = null, cond1 not assigned, use default value
    
    // Example URL: POST /articles
    // Post data { subject: 'New Subject', content: 'New Content' }
    let request = new Request(event)
    let subject = request.input('subject')
    // subject = 'New Subject'
    let content = request.input('content')
    // content = 'New Content'
    let visiable = request.input('visiable', false)
    // visiable = false // visiable not assigned, use default value

    // Get all query strings and post data
    let all = request.all()

    // Get User
    let user = request.user() || {}
    let user_id = user.id || null
    // if user has authorized from cognito
    
    // Response
    Response.json({ message: 'ok'}, 200) // status code is 200 
    Response.success({ message: 'ok' }) // status code is 200
    Response.badRequest({ error: 'Bad request' }) // status code is 400
    Response.unauthorized({ error: 'Unauthorized' }) // status code is 401
    Response.forbidden({ error: 'Forbidden' }) // status code is 403
    Response.notFound({ error: 'Not found' }) // status code is 404
    Response.unprocessable({ error: 'Field name is required' }) // status code is 422
    Response.internalError({ error: 'Internal error' }) // status code is 500
    Response.customize({ error: 'custom error' }, 503) // status code is 503 
}

```

## License

This SDK is distributed under the GNU GENERAL PUBLIC LICENSE Version 3, see LICENSE for more information.