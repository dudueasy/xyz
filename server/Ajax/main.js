// 这是一个自定义 $.ajax() 的 demo

let response
let request
let jQuery = {}
let button = document.querySelector('#myButton')
window.jQuery = jQuery
window.$ = window.jQuery

// --------------------第一版代码: 使用keyword arguments--------------------
//  body 表示请求体.
//  successFn 和 failFn 处理函数要接收 request.responseText
// window.jQuery.ajax = function (url = '', body = '', successFn = {}, failFn = {}, method = 'POST') {
//     let request = new XMLHttpRequest()
//     url = url
//     request.open(method, url)
//
//     // 监听请求状态
//     request.onreadystatechange = () => {
//         if (request.readyState === 4) {
//             if (request.status >= 200 && request.status < 300) {
//                 successFn.call(undefined, request.responseText)
//             }
//             // 请求失败
//             else if (request.status >= 400) {
//                 failFn.call(undefined, request.responseText)
//             }
//         }
//     }
//     request.send(body)
// }
//
// button.addEventListener(
//     'click', (e) => {
//         window.jQuery.ajax(
//             url = '/xxx',
//             body = 'nothing special',
//             method = "POST",
//             successFn = (data) => {
//                 console.log(`success with ${data}`)
//             },
//             failFn = (data) => {
//                 console.log(`fail with ${data}`)
//             },
//         )
//     }
// )
// --------------------第一版代码结束--------------------

// --------------------第二版代码: 使用对象作为参数. 用对象的属性传值--------------------

window.jQuery.ajax = function (options) {

    let url
    //利用 arguments 实现对不定数量参数的支持
    if (arguments.length === 1) {
        url = options.url
    } else if (arguments.length === 2) {
        url = arguments[0]
        options = arguments[1]
    }

    // 在函数内部使用 参数对象options的属性
// ---------------  这部分代码用ES6 解构赋值 替代 ---------------
    // let method = options.method
    // let body = options.body
    // let successFn = options.successFn
    // let failFn = options.failFn
    // headers 是一个哈希.
    // eg: headers = {k1:v1, k2:v2}
    // let headers = options.headers

// --------------- ES6 解构赋值 ---------------
    // 给变量赋值的时候, 直接根据右边部分同名的属性来取值.

    let {method, body, successFn, failFn, headers} = options


    let request = new XMLHttpRequest()
    request.open(method, url)

    //设置header
    for (let key in headers) {
        let value = headers[key]
        request.setRequestHeader(key, value)
    }

    // 监听请求状态
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                successFn.call(undefined, request.responseText)
            }
            // 请求失败
            else if (request.status >= 400) {
                failFn.call(undefined, request.responseText)
            }
        }
    }
    request.send(body)
}

// 对象传参的好处是可以用键值对的方式来定义参数值

button.addEventListener('click',
    (e) => {
        $.ajax(
            '/xxx',
            {
                // url: '/xxx',
                method: 'POST',
                body: 'whatever',
                // 由于我们在 $.ajax 中定义了 successFn 函数调用为 :
                //      successFn.call(undefined, request.responseText)
                // 所以 successFn 一定会有一个 响应数据 作为参数
                // failFn 同理
                headers: {'apolo': 16},
                successFn: (data) => {
                    console.log(`success with ${data}`)
                },
                failFn: (data) => {
                    console.log(`fail with ${data}`)
                },
            })
    }
)


