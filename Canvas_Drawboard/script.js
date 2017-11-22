//初始化canvas
    //flag = 1 表示准备书写状态, flag =2 表示正在书写状态, flag = 3 表示准备擦除状态, flag =4 表示正在擦除状态
    var flag = 1
    var canvas = document.getElementById('canvas')

    //获得操作按钮
    var eraser = document.getElementById('eraser')
    var brush = document.getElementById('brush')
    var cleaner = document.getElementById('cleaner')

    var context = canvas.getContext('2d')
    var lastPos ={x:undefined, y:undefined}
    var width = 10
    var radius = function () {return width/2}

    var color = 'black'
    //生成 颜色按钮 和 尺寸按钮 的列表
    var colorsNode = document.querySelector('.colors')
    var colorButtons = get_children(colorsNode)
    var sizesNode = document.querySelector('.sizes')
    var sizeButtons = get_children(sizesNode)

    //分别对颜色按钮和尺寸按钮添加事件
    changeButtonAndAttr(colorButtons,'id')
    changeButtonAndAttr(sizeButtons,'offsetHeight')

    setCanvasSize(canvas)
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
    function setCanvasSize(canvas) {
        pageWidth = document.documentElement.clientWidth
        pageHeight = document.documentElement.clientHeight

        canvas.height = pageHeight
        canvas.width = pageWidth
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
            eraser.classList.add('active')
            brush.classList.remove('active')
        }}

    brush.onclick = function(){
        if(flag == 3)
            //eraser off
            flag = 1
            brush.classList.add('active')
            eraser.classList.remove('active')

    }

    cleaner.onclick = function () {
        context.clearRect(0,0,canvas.width,canvas.height)

    }
    //橡皮擦
    function eraserOn(x,y,width) {
        context.clearRect(x-width/2,y-width/2,width,width)
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
                eraserOn( tPosition(e).x , tPosition(e).y,10)
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
                eraserOn(position(e).x,position(e).y,10)
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
            button.onclick = function () {

                buttons.forEach(function(button) {
                    button.classList.remove('active')
                })

                if(attr === 'id'){
                    color = button[attr]
                }
                else if(attr === 'offsetHeight'){
                    width = button[attr]
                }
                button.classList.add('active')
            }
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