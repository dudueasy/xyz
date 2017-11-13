   var keys = {
    0:{0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p','length':10},
    1:{0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l','length':9},
    2:{0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m','length':7},
    'length':3
    }

    var hash = {
        'q': 'http://qq.com',
        'w': 'http://weibo.com',
        'e': 'http://ele.me',
        'r': 'http://renren.com',
        't': 'http://tianya.com',
        'y': 'http://youtube.com',
        'u': 'http://uc.com',
        'i': 'http://iqiyi.com',
        'o': 'http://opera.com',
        'p': 'http://',
        'a': 'http://acfun.tv',
        's': 'http://sohu.com',
        'z': 'http://zhihu.com',
        'm': 'http://www.mcdonalds.com.cn'
    }
    
    index = 0
    
    while(index < keys['length']){
        div1 = document.createElement('div')
        main.appendChild(div1)
        row = keys[index]
        index2 = 0

        while (index2 < row['length']){
            kbd = document.createElement('kbd')
            kbd.textContent = row[index2]
            div1.appendChild(kbd)
            index2 ++
        } 

        index ++
    }

    document.addEventListener('keydown',function(e){
        key = e.key

        if(Object.keys(hash).indexOf(key) != -1){
            //stop unassigned key from triggering new tab.
            window.open(hash[key],'_self')
        }
    })

    console.log(index)