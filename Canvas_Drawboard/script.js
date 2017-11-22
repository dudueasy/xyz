
    //初始化canvas
    //flag = 1 表示准备书写状态, flag =2 表示正在书写状态, flag = 3 表示准备擦除状态, flag =4 表示正在擦除状态
    var flag = 1
    var canvas = document.getElementById('canvas')

    //获得操作按钮
    var eraser = document.getElementById('eraser')
    var brush = document.getElementById('brush')
    var cleaner = document.getElementById('cleaner')
    var saveButton = document.getElementById('save')

    var context = canvas.getContext('2d')
    var lastPos ={x:undefined, y:undefined}
    var width = 10
    var radius = function () {return width/2}

    var color = 'black'
    //生成 颜色按钮 和 尺寸按钮 的列表
    var colorsNode = document.getElementById('colors')
    var colorButtons = get_children(colorsNode)
    var sizesNode = document.getElementById('sizes')
    var sizeButtons = get_children(sizesNode)

    //分别对颜色按钮和尺寸按钮添加事件
    changeButtonAndAttr(colorButtons,'id')
    changeButtonAndAttr(sizeButtons,'offsetHeight')

    setCanvasSize(canvas,context)
    window.onresize = function(){
        setCanvasSize(canvas)
    }
if(document.body.ontouchstart !== undefined){
        //使用触摸事件处理器.
        touchHandler(canvas)
    }else{
        //使用鼠标事件处理器.
        mouseHandler(canvas)

    }


    //---------------工具函数--------------
    //最大化画布尺寸
    function setCanvasSize(canvas,context) {
        pageWidth = document.documentElement.clientWidth
        pageHeight = document.documentElement.clientHeight

        canvas.height = pageHeight
        canvas.width = pageWidth

        context.fillStyle = 'white'
        context.fillRect(0,0,canvas.width,canvas.height)
    }

    //位置跟踪器
    function posTracker(x,y) {
        lastPos.x = x
        lastPos.y = y
    }

    //绘制一个圆点
    function drawCircleDot(x,y,radius ,color) {
        context.beginPath()
        context.fillStyle = color
        context.arc(x,y,radius,0,360)
        context.fill()
        context.closePath()
        posTracker(x,y)
    }

    //绘制一条线
    //x1, y1 表示上一个位置的x, y值
    function drawline(x1,y1,x2,y2,width,color) {
        context.beginPath()
        context.strokeStyle = color
        context.lineWidth = width
        context.lineJoin = context.lineCap = 'round';

        context.moveTo(x1,y1)
        context.lineTo(x2,y2)
        context.stroke()
        context.closePath()
        posTracker(x2,y2)
    }

    //橡皮擦按钮
    eraser.onclick = function () {
        if(flag == 1){
            //eraser on
            flag = 3
            //切换画笔和橡皮擦图标
            eraser.classList.add('actived')
            brush.classList.remove('actived')
        }}

    brush.onclick = function(){
        if(flag == 3)
            //eraser off
            flag = 1
            brush.classList.add('actived')
            eraser.classList.remove('actived')

    }

    cleaner.onclick = function () {
        context.clearRect(0,0,canvas.width,canvas.height)
    }

    saveButton.onclick = function () {

        var url = canvas.toDataURL('image/jpeg', 1)
        var a = document.createElement('a')
        a.href = url
        a.download = '我的作品'
        a.click()

    }

    //橡皮擦开启
    function eraserOn(x,y,width) {
        context.clearRect(x - radius(),y - radius(),width,width)

        //这行代码只用于使用白色画笔作为橡皮擦的情况
        posTracker(x,y)
    }

    //位置生成器
    //鼠标位置生成器
    function position(e) {
            return {
                x: e.clientX,
                y: e.clientY
            }
    }
    //触摸位置生成器
    function tPosition(e) {
            return{
                x:e.changedTouches[0].clientX,
                y:e.changedTouches[0].clientY
            }
    }

    //触摸事件处理器
    function touchHandler(canvas){

        canvas.ontouchstart = function (e) {
            if(flag == 1){
                drawCircleDot(tPosition(e).x, tPosition(e).y,radius(),color)
                flag = 2
            }
            if(flag == 3){
                eraserOn(tPosition(e).x, tPosition(e).y ,width)
                flag = 4
            }
        }

        canvas.ontouchmove = function (e) {
            if(flag == 2){
                drawline( lastPos.x, lastPos.y, tPosition(e).x ,tPosition(e).y, width,color)
            }
            if(flag == 4){
                // eraserOn( tPosition(e).x , tPosition(e).y,width)

                //现在使用白色画笔作为橡皮擦使用, 上面一行代码是原清除像素功能.
                drawline( lastPos.x, lastPos.y,tPosition(e). x,tPosition(e).y, width,'white')
            }
        }

        canvas.ontouchend = function(e){

            if(flag == 2){
                drawCircleDot( tPosition(e).x, tPosition(e).y,radius(),color)
                flag=1
            }
            if(flag == 4){
                eraserOn( tPosition(e).x, tPosition(e).y, width)
                flag = 3
            }
        }
    }

    //鼠标事件执行器
    function  mouseHandler(canvas){

        canvas.onmousedown = function (e) {
            if(flag == 1){
                drawCircleDot(position(e).x,position(e).y,radius(),color)
                flag = 2
            }
            if(flag == 3){
                eraserOn(position(e).x,position(e).y,width)
                flag = 4
            }
        }

        canvas.onmousemove = function (e) {
            if(flag == 2){
                drawline( lastPos.x, lastPos.y,position(e).x,position(e).y, width,color)
            }
            if(flag == 4){
                //eraserOn(position(e).x,position(e).y,width)

                //现在使用白色画笔作为橡皮擦使用, 上面一行代码是原清除像素功能.
                drawline( lastPos.x, lastPos.y,position(e). x,position(e).y, width,'white')
            }
        }

        canvas.onmouseup = function(e){
            if(flag == 2){
                drawCircleDot(position(e).x,position(e).y, radius(),color)
                flag=1
            }
            if(flag == 4){
                eraserOn(position(e).x,position(e).y,width)
                flag = 3
            }
        }
    }

    //按钮切换功能, 根据传入的属性给全局变量赋值.
    function changeButtonAndAttr(buttons,attr) {
        buttons.forEach(function(button){

            function clickHandler() {
                buttons.forEach(function(button) {
                    button.classList.remove('actived')
                })

                if(attr === 'id'){
                    color = button[attr]
                }
                else if(attr === 'offsetHeight'){
                    width = button[attr]
                }
                button.classList.add('actived')
            }

            //为按钮增加了 touchstart 支持.
            ['touchstart','click'].forEach(function (e) {
                button.addEventListener(e,clickHandler)
            })


        })
    }

    //儿子生成器
    function get_children(nodeElement) {
        children = []
        for(var i =0 ; i < nodeElement.children.length; i++){
            children.push(nodeElement.children[i])
        }
        return children
    }