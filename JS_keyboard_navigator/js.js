    //1. 初始化数据

    var keys = init()['keys']
    var hash = init()['hash']

    //2. 生成键盘
    keyboardGenerator(keys, hash)

    //3. 监听键盘
    keyboardListener(hash)

    //下面是工具函数
    //生成标签和标签的元素. attributes参数是一个键值对.
    function newElemWithAttr(tagName, attributes) {
        var element = document.createElement(tagName)
        for(var key in attributes){
            element[key] = attributes[key]
        }
        return element
    }

    //对目标对象设置 src属性, target是一个img标签.
    function setIconSrc(target, domain) {
        if(domain) {
            target.src = domain + '/favicon.ico'
        }else{
            target.src= 'image/whitedot.png'
        }
        target.onerror = function () {
            target.src = 'image/whitedot.png'
        }
    }

    //初始化数据
    function init(){
        var keys = {
            0:{0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p','length':10},
            1:{0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l','length':9},
            2:{0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m','length':7},
            'length':3
        }

        if(window.localStorage && localStorage.getItem('hash')) {
            var hash = JSON.parse(localStorage.getItem('hash'))
        }
        else{
            var hash = {
                'q': 'http://qq.com', 'w': 'http://weibo.com', 'e': 'http://ele.me', 'r': 'http://renren.com',
                't': 'http://tianya.com', 'y': 'http://youtube.com', 'u': 'http://uc.com', 'i': 'http://iqiyi.com',
                'o': 'http://opera.com', 'p': 'http://', 'a': 'http://acfun.tv', 's': 'http://sohu.com',
                'z': 'http://zhihu.com', 'b': 'http://www.bilibili.com', 'm': 'http://www.mcdonalds.com.cn'
            }
        }
        return {
            "keys" : keys,
            "hash" : hash
        }
    }

    //键盘生成器
    function keyboardGenerator(keys, hash) {
        //根据keys对象的'length', 来生成多个row
        //每个row是一个对象, 映射了一排键盘上的字母, 每个row都有length属性, 用于遍历整个row表.
        for(var index=0; index < keys['length']; index++){
            var div1 = newElemWithAttr('div')
            main.appendChild(div1)
            var row = keys[index]

            //遍历row对象里的每一个元素, 分别生成一个 <kbd>, 每个<kbd>的文本为row对象的值, 每个<kbd> 还有一个子元素 <button>
            for(var index2 = 0; index2 < row['length']; index2 ++){

                var img = newElemWithAttr('img')
                var span = newElemWithAttr('span',{'textContent':row[index2],'className':'text'})
                var button = newElemWithAttr('button',{'textContent':'Edit'})
                var kbd = newElemWithAttr('kbd',{'id':row[index2]})

                setIconSrc(img,hash[kbd.id])

                kbd.appendChild(span)
                kbd.appendChild(img)
                div1.appendChild(kbd)

                //实现定制键盘对应网页的功能.
                button.onclick = function (e) {
                    var currentId = e.target.parentNode.id
                    var x= prompt('请输入一个网址')
                    if(x.startsWith('http://')){
                        hash[currentId] = x
                    }else{
                        hash[currentId] = 'http://'+x
                    }
                    localStorage.setItem('hash',JSON.stringify(hash))
                    setIconSrc(e.target.previousSibling,hash[e.target.parentNode.id])
                }
                kbd.appendChild(button)
            }
        }

    }

    //键盘监听器
    function keyboardListener(hash){
        document.addEventListener('keydown',function(e){
            var key = e.key

            //确保只对hash对象中的key生效, 当key不存在的时候, indexOf 返回值是 -1
            if(Object.keys(hash).indexOf(key) > -1 && e.shiftKey != true){
                //stop unassigned key from triggering new tab.
                window.open(hash[key],'_blank')
            }
        })
    }
