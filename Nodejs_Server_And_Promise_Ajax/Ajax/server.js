let http = require('http')
let fs = require('fs')
let url = require('url')
let querystring = require('querystring')
let port = process.argv[2]
let md5 = require('md5')
// 指定端口8888
port = 8888

if (!port) {
    console.log('请指定端口号, eg: \nnode Nodejs_Server_And_Promise_Ajax.js 8888')
    process.exit(1)
}

//================ 工具代码start here ================

let server = http.createServer(function (request, response) {
        // 服务器初始化设置: 地址解析, 获取查询参数, 请求类型
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

        // 初始化 sessions
        let sessions = getDBData('./db/sessions.json')
        console.log(sessions)

        // 访问根路径
        if (path === '/') {
            // 获取请求cookie中的username, 确认用户的登陆状态
            let requestCookie = request.headers.cookie
            let cookieEmail = ''
            let loginUserData
            let userLogin = false

            //// 如果请求头中有cookie
            if (requestCookie) {
                let cookieArray = requestCookie.split(';')

                // 检查cookie中是否sessionId
                // 检查sessionId是否有效if(sessions[sessionId])

                cookieArray.forEach((currentCookieString) => {
                    console.log(currentCookieString)
                    if (currentCookieString.indexOf('sessionId') >= 0) {
                        sessionId = currentCookieString.split("=")[1]
                        console.log('sessionId:', sessionId)
                        if (sessions[sessionId]) {
                            loginUserData = sessions[sessionId]
                            console.log('loginUserData', loginUserData)
                            userLogin = true
                        }
                    }
                })

                //     // 检查数据库中是否存在 cookie 中的email
                //     if (cookieEmail) {
                //         let userData = getDBData('./db/users.json')
                //         userData.forEach((currentUserData) => {
                //             if (currentUserData['email'] === cookieEmail) {
                //                 loginUserData = currentUserData
                //                 userLogin = true
                //             }
                //         })
                //     }
            }


            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html;charset=utf-8')
            htmlData = getHTMLData('index.html')

            if (userLogin) {
                htmlData = htmlData.replace('__userinfo__', `欢迎回来: ${loginUserData['email']}`)
            }
            else {
                htmlData = htmlData.replace('__userinfo__', '')

            }

            response.end(htmlData)
        }
        //
        else if (path === '/favicon.ico') {
            response.statusCode = 200
            htmlData = fs.readFileSync('favicon.ico', "binary");
            response.write(htmlData, "binary"); //格式必须为 binary，否则会出错

            response.end()
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

            response.setHeader('Content-Type', 'text/javascript;charset=utf-8')

            //对请求中的 Etag 标识符判断
            data = getHTMLData('./Customized_Ajax.js')
            let fileMd5 = md5(data)

            response.setHeader('Etag', fileMd5)

            // 请求返回的文件标识符一致, 无需更新
            if (request.headers['if-none-match'] === fileMd5) {
                response.statusCode = 304 // 告诉浏览器资源没有变化, 直接使用缓存, 所以不需要响应体.

            }
            // 标识符不一致, 需要更新
            else {
                response.statusCode = 200
                response.write(data)
            }

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

                        // 获取Post 数据中的 邮箱 和 密码
                        let {email, password, confirm_password} = postData
                        console.log('postData: ', postData)

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
                        // 表单数据验证成功
                        else {

                            //  获取数据库用户数据
                            let userData = getDBData('./db/users.json')

                            // 检查email重复函数
                            function isEmailDuplicated(currentUserData, index, userDataArray) {
                                return (currentUserData['email'] === email)
                            }

                            // email 重复
                            if (userData.some(isEmailDuplicated)) {
                                response.statusCode = 400
                                response.setHeader('Content-Type', 'application/json;charset=utf-8')
                                response.write(`{"errors":{"email":"duplicated"}}`)
                                // response.write(`{ "errors":{ "password":"not match"} }`)

                                response.end()

                            }
                            // email 可用. 向数据库写入数据
                            else {
                                // 数据库校验成功, 新建一个用户并添加到数据库 (db/users.json)
                                // 创建一个用户id
                                let userid = userData.slice(-1)[0]['userid'] + 1
                                let newUser = {'userid': userid, 'email': email, 'password': password}
                                userData.push(newUser)
                                updateDBData('./db/users.json', userData)

                                // 返回响应
                                response.statusCode = 200
                                response.setHeader('Content-Type', 'application/json;charset=utf-8')
                                response.write(`{ "success":"true" }`)
                                response.end()
                            }
                        }
                    }
                )
            }
        }
        // 访问登录页面
        else if (path === '/login') {
            if (method === 'GET') {
                response.statusCode = 200
                response.setHeader('Content-Type', 'text/html;charset=utf-8')
                data = getHTMLData('login.html')
                response.write(data)
                response.end()
            }
            if (method === 'POST') {

                // 获取登录数据
                getPostData(request).then(
                    (postData) => {

                        // 获取Post 数据中的 邮箱 和 密码
                        let {email, password} = postData
                        console.log('postData: ', postData)

                        // 初始化查询的结果
                        let queryResult = {found: false, match: false, data: {}}

                        // 查询数据库, 向 queryResult 写入结果
                        let userData = getDBData('./db/users.json')
                        userData.forEach((currentUserData) => {
                            if (currentUserData['email'] === email) {
                                queryResult['found'] = true
                                if (currentUserData['password'] === password) {
                                    queryResult['match'] = true
                                    queryResult['data'] = currentUserData
                                }
                            }
                        })

                        // 根据查询的结果做出响应
                        //// 邮箱匹配
                        if (queryResult['found']) {
                            // 密码匹配, 登录成功
                            if (queryResult['match']) {

                                // 创建一个sessionId, 将sessionId 和用户数据存入 sessions
                                let sessionId = Math.random() * 1e6
                                sessions[sessionId] = {email: email}
                                updateDBData('./db/sessions.json', sessions)

                                response.statusCode = 200
                                response.setHeader('Content-Type', 'text/html;charset=utf-8')
                                response.setHeader(`Set-Cookie`, [`sessionId=${sessionId};HttpOnly`])

                                response.write(`{ "success":"true" }`)
                                response.end()
                            }
                            // 密码不匹配
                            else {
                                response.statusCode = 401
                                response.setHeader('Content-Type', 'application/json;charset=utf-8')
                                response.write(`{ "errors":{ "password":"not match"} }`)
                                response.end()
                            }
                        } // 邮箱不匹配
                        else {
                            response.statusCode = 401
                            response.setHeader('Content-Type', 'application/json;charset=utf-8')
                            response.write(`{ "errors":{ "email":"not found"} }`)
                            response.end()
                        }
                    }
                )
            }
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

function getHTMLData(path) {

    // 注意事项: readFileSync 必须指定 encoding参数, 才会返回字符串, 否则返回一个 buffer对象
    return string = fs.readFileSync(path, 'utf8')

}

function getDBData(path, option = 'utf8') {
    return JSON.parse(fs.readFileSync(path, option))
}

function updateDBData(path, data) {
    fs.writeFileSync(path, JSON.stringify(data))
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


