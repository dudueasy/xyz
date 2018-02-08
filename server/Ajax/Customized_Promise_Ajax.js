let $ = {}
window.$ = $
let button = document.querySelector('#myButton')


// ---------- 自定义的 promise $.ajax ----------
$.ajax = function ({url, method, headers, body}) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest()
        request.open(method, url)

        //设置header
        for (let key in headers) {
            let value = headers[key]
            request.setRequestHeader(key, value)
        }

        // 监听请求状态
        request.onreadystatechange = () => {

            //成功处理和失败处理
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    resolve.call(undefined, request.responseText)
                }
                // 请求失败
                else if (request.status >= 400) {
                    reject.call(undefined, request.responseText)
                }
            }
        }
        request.send(body)
    })
}




button.addEventListener('click', (e) => {
    $.ajax({
        url: '/xxx',
        method: 'get',
    })

        .then(
            (data) => {
                console.log(`success with ${data}`)
                return 'success'
            },
            (data) => {
                console.log(`fail with ${data}`);
                return 'fail'
            })

        .then(
            (text) => {
                console.log(text)
            },
            (request) => {
                console.log(request)
            }
        )
})