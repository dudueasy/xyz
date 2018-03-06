window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    if (typeof nodeOrSelector === 'string') {
        let temp = document.querySelectorAll(nodeOrSelector)
        for (let i = 0; i < temp.length; i++) {
            nodes[i] = temp[i]
        }
        //length property is required for an array-like object
        nodes.length = temp.length
    } else if (nodeOrSelector instanceof Node) {
        nodes = {
            0: nodeOrSelector,
            length: 1
        }
    }

    // classes参数是可迭代的对象, classes 的示范:
    // var class = {'a':true, 'b': false, 'c':true}

    nodes.addClass = function (classes) {
        for (let key in classes) {
            var value = classes[key]
            var methodName = value ? 'add' : 'remove'
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].classList[methodName](key)
            }
        }
    }
//.text() 方法, 如果没有传参数就直接返回值节点的textContent
// 如果传了参数,就重写节点的 textContent

    nodes.text = function (text) {
        if (text === undefined) {
            let text = []
            for (let i = 0; i < nodes.length; i++) {
                text.push(nodes[i].textContent)
            }
            return text
        } else {
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].textContent = text
            }
            return nodes
        }
    }
    return nodes
}

