//初始化canvas
    //flag = 1 表示准备书写状态, flag =2 表示正在书写状态, flag = 3 表示准备擦除状态, flag =4 表示正在擦除状态
    var flag = 1
    var canvas = document.getElementById('canvas')
    var eraser = document.getElementById('eraser')
    var brush = document.getElementById('brush')
    var actions = document.querySelector('.actions')
    var context = canvas.getContext('2d')
    var lastPos ={x:undefined, y:undefined}
    var width = 10
    var radius = width/2
    var color = 'black'

    setCanvasSize(canvas)

    window.onresize = function(){
       setCanvasSize(canvas)
    }


    //mouseEventListener
    canvas.onmousedown = function (e) {
        if(flag == 1){
            drawCircleDot(e.clientX,e.clientY,radius,color)
            flag = 2
        }
        if(flag == 3){
            eraserOn(e.clientX,e.clientY,width)
            flag = 4
        }
    }

    canvas.onmousemove = function (e) {
        if(flag == 2){
                drawline( lastPos.x, lastPos.y,e.clientX,e.clientY, width,color)
        }
        if(flag == 4){
            eraserOn(e.clientX,e.clientY,10)
        }
    }

    canvas.onmouseup = function(e){
        if(flag == 2){
        drawCircleDot(e.clientX, e.clientY,radius,color)
        flag=1
        }
        if(flag == 4){
            eraserOn(e.clientX,e.clientY,width)
            flag = 3
        }
    }


    //工具函数
    //最大化画布
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
    function drawCircleDot(x,y,radius,color) {
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
            actions.classList.add('x')
        }}

    brush.onclick = function(){
        if(flag == 3)
            //eraser off
            flag = 1
            actions.classList.remove('x')
    }

    //橡皮擦
    function eraserOn(x,y,width) {
        context.clearRect(x-width/2,y-width/2,width,width)
    }
