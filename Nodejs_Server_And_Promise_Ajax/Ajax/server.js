let http = require('http')
let fs = require('fs')
let url = require('url')
let querystring = require('querystring')
let port = process.argv[2]

// 指定端口8888
port = 8888

if (!port) {
    console.log('请指定端口号, eg: \nnode Nodejs_Server_And_Promise_Ajax.js 8888')
    process.exit(1)
}

let server = http.createServer(function (request, response) {
        let parsedUrl = url.parse(request.url, true)
        let pathWithQuery = request.url
        let queryString = ''
        if (pathWithQuery.indexOf('?') >= 0) {
            queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
        }
        let path = parsedUrl.pathname
        let query = parsedUrl.query
        let method = request.method

        console.log('查询字符串的路径为 \n' + pathWithQuery)
        console.log(method)

        // 访问根路径
        if (path === '/') {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html;charset=utf-8')
            htmlData = getHTMLData('index.html')
            // response.write(htmlData)
            response.end(htmlData)
        }
        //
        else if (path === '/comic.png') {
            response.statusCode = 200
            response.setHeader('Content-Type', 'image/png')
            htmlData = fs.readFileSync('comic.png', "binary");
            response.write(htmlData, "binary"); //格式必须为 binary，否则会出错

            response.end()
        }
        // 获取 Customized_Ajax.js文件
        else if (path === '/Customized_Ajax.js') {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
            data = getHTMLData('./Customized_Ajax.js')
            response.write(data)
            response.end()

        }
        // 访问 promise ajax 页面
        else if (path === '/promise/') {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html;charset=utf-8')
            htmlData = getHTMLData('index_promise.html')
            response.write(htmlData)
            response.end()

        }
        // 获取 Customized_Promise_Ajax.js 文件
        else if (path === '/Customized_Promise_Ajax.js') {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
            data = getHTMLData('Customized_Promise_Ajax.js')
            response.write(data)
            response.end()

        }
        // 获取一个 json 串作为响应
        else if (path === '/xxx') {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/json;charset=utf-8')
            response.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000')

            response.write(
                JSON.stringify({
                    "note": {
                        "to": "George",
                        "from": "John",
                        "heading": "Reminder",
                        "body": "Don\'t forget the meeting"
                    }
                })
            )
            response.end()

        }
        // 访问注册页面
        else if (path === '/register') {
            if (method === 'GET') {
                response.statusCode = 200
                response.setHeader('Content-Type', 'text/html;charset=utf-8')
                data = getHTMLData('register.html')
                response.write(data)
                response.end()
            }
            // 注册页面提交数据
            else if (method === 'POST') {
                getPostData(request).then(
                    (postData) => {

                        let {email, password, confirm_password} = postData
                        console.log('postData: ', postData)
                        console.log(email, password, confirm_password)
                        console.log('typeof email: ', typeof email)
                        // 验证失败
                        if (email.indexOf('@') < 0 || password !== confirm_password) {
                            console.log('验证失败')
                            if (email.indexOf('@') < 0) {
                                response.statusCode = 400

                                response.setHeader('Content-Type', 'application/json;charset=utf-8')
                                response.write(`{"errors":{"email":"invalid"}}`)
                                response.end()
                            }
                            else if (password !== confirm_password) {
                                response.statusCode = 400
                                response.setHeader('Content-Type', 'application/json;charset=utf-8')
                                response.write(`{ "errors":{ "password":"not match"} }`)
                                response.end()
                            }

                        }
                        // 验证成功
                        else {
                            response.statusCode = 200
                            response.setHeader('Content-Type', 'application/json;charset=utf-8')
                            response.write(`"验证成功"`)
                            response.end()
                        }


                        // let jsonData = JSON.stringify(postData)
                        // console.log(jsonData)
                        // response.statusCode = 200
                        // response.setHeader('Content-Type', 'text/json;charset=utf-8')
                        // response.write('test')

                    }
                )
            }
        }
        // 访问登陆页面
        else if (path === '/sign_in') {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html;charset=utf-8')
            data = getHTMLData('sign_in.html')
            response.write(data)
            response.end()


        }

        // 如果访问的是其他路径
        else if (path) {
            console.log(path)
            response.statusCode = 404
            response.setHeader('Content-Type', 'text/html;charset=utf-8')
            response.write('404 not found')
            response.end()
        }
    }
)

//================ 工具代码start here ================

function getHTMLData(path) {

    // 注意事项: readFileSync 必须指定 encoding参数, 才会返回字符串, 否则返回一个 buffer对象
    return string = fs.readFileSync(path, 'utf8')

}

function getDBData(path, option = 'utf8') {
    return db_data = fs.readFileSync(path, option)
}

function updateDBData(path, data) {
    fs.writeFileSync(path, data)

}

function putDBDataToHTML(htmlData, DBData) {
    return htmlData.replace('$tobereplaced$', DBData)

}

function getPostData(request) {
    return new Promise((resolve, reject) => {
        let body = ''
        request.on('data', (chunk) => {
            body += (chunk)
        }).on('end', () => {
            body = querystring.parse(body);
            resolve(body)
        })
    })
}

// function readBody(request){
//     return new Promise((resolve, reject)=>{
//         let body = []
//         request.on('data', (chunk) => {
//             body.push(chunk);
//         }).on('end', () => {
//             body = Buffer.concat(body).toString();
//             resolve(body)
//         })
//     })
// }


//================ 工具代码end here ================


server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


