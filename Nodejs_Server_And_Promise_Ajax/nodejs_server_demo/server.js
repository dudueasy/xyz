let http = require('http')
let fs = require('fs')
let url = require('url')
let port = process.argv[2]

// 指定端口
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
            dbData = getDBData('db.txt')
            dynamicHtmlData = putDBDataToHTML(htmlData, dbData)
            response.write(dynamicHtmlData)
        }
        // 访问 /pay 路径
        else if (path === '/pay/') {

            if (method === 'POST') {
                response.statusCode = 200
                response.setHeader('Content-Type', 'text/html;charset=utf-8')

                htmlData = getHTMLData('index.html')
                dbData = getDBData('db.txt')
                Current_Data = dbData - 1
                updateDBData('db.txt', Current_Data)
                dynamicHtmlData = putDBDataToHTML(htmlData, Current_Data)

                response.write(dynamicHtmlData)
            }
        }
        // image标签发起请求demo
        else if (path === '/image_request_demo/') {
            if (method === 'GET') {
                data = getHTMLData('request_by_image.html')
                response.write(data)
            }
        }
        // image 请求处理
        else if (path === '/image_request/') {
            if (method === 'GET') {

                // 这里的代码用来响应 <img> 发起的请求
                response.statusCode = 200
                response.setHeader('Content-Type', 'image/jpeg')

                data = fs.readFileSync('db_pic2.jpeg')
                response.write(data)
            }
        }
        // script 请求demo
        else if (path === '/script_request_demo/') {
            if (method === 'GET') {
                data = getHTMLData('request_by_script.html')
                response.write(data)
            }
        }
        // script 请求处理
        else if (path === '/script_request/') {
            if (method === 'GET') {
                // 设置响应头
                response.statusCode = 200
                response.setHeader('Content-Type', 'text/plain;charset=utf-8')

                // 通过查询参数中 callback 的值, 动态地返回回调函数
                data = `${query.callback}({"msg":"apolo"})`

                // 响应数据
                response.write(data)
            }
        }

        else {
            console.log(path)
            response.statusCode = 404
            response.setHeader('Content-Type', 'text/html;charset=utf-8')
            response.write('404 not found')
        }
        response.end()
    }
)

//================ 工具代码start here ================

function getHTMLData(path) {
    // readFileSync 必须制定 encoding参数, 才会返回字符串, 否则返回一个 buffer对象

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

//================ 工具代码end here ================


server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


