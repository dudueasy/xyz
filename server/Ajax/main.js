let response

myButton.addEventListener('click', (e) => {
    let request = new XMLHttpRequest()
    url = '/xxx'

    // 监听请求状态
    request.onreadystatechange = () => {
        if (request.readyState === 4) {

            if (request.status >= 200 && request.status < 300) {

                console.log('响应成功')
                // console.log(`request.response = ${request.response}`)
                // console.log(`request.responseText = ${request.responseText}`)
                response = JSON.parse(request.response)
                console.log(response)

            }
            // 请求失败
            else if (request.status >= 400) {

            }
        }
    }

    request.open('GET', url)
    request.send()

})