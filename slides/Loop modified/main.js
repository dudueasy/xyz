let $slides = $('.slides')
let $images = $slides.children('img')
let $previous = $('.controls> .previousPage')
let $next = $('.controls> .nextPage')
imageLength = $images.length
let current = 0

createButtons()
let $buttons = $('#buttonWrapper > button')

makeFakeSlides()
$slides.css({'transform': 'translateX(-400px)'})

bindClickEvnets()
let timerId = startTimer()
$(document).on('visibilitychange', visibilityChangeHandler)



element_list = [$slides, $previous, $next]
for (let i = 0; i < $buttons.length; i++) {
    element_list.push($buttons.eq(i))
}

timerToggleListener(element_list)


// 生成轮播图的数字标签
function createButtons() {
    for (let i = 1; i <= imageLength; i++) {
        $(`<button>${i}</button>`).appendTo($("#buttonWrapper"))
    }
}


function makeFakeSlides() {
    $firstCopy = $images.eq(0).clone(true)
    $lastCopy = $images.eq(imageLength - 1).clone(true)
    $slides.prepend($lastCopy)
    $slides.append($firstCopy)
}

// 移动轮播图函数
function slidesMove(index, slideElement) {
    order = index + 1
    slideElement.css({transform: 'translateX(' + order * -400 + 'px)'})
    return slideElement
}

// 根据index 来控制轮播函数
function goToSlide(index) {
    index = index % imageLength
    if (current === imageLength - 1 && index === 0) {
        // 从最后一张往后跳转到第一张
        slidesMove(imageLength, $slides).one(
            'transitionend', () => {
                $slides.hide().offset()
                slidesMove(index, $slides).show()
            }
        )
        current = index

    } else if (current === 0 && index === imageLength - 1) {
        // 从第一张往前跳到最后一张

        slidesMove(-1, $slides).one(
            'transitionend', () => {
                $slides.hide().offset()
                slidesMove(index, $slides).show()
            }
        )
        current = index

    } else {
        slidesMove(index, $slides)
        current = index
    }
}

// 为dom元素添加点击事件
function bindClickEvnets() {
    $next.on('click', () => {

        console.log(current)
        index = current + 1
        goToSlide(index)

    })
    $previous.on('click', () => {
        console.log(current)
        index = current - 1
        if (index < 0) {
            index = imageLength - 1
        }
        goToSlide(index)

    })

    $('#buttonWrapper').on('click', 'button', (e) => {
        let index = $(e.currentTarget).index()
        goToSlide(index)
    })
}

// 开启计时器代码
function startTimer() {
    console.log('start timer')

    let timerId = setInterval(
        () => {
            index = current + 1
            goToSlide(index)
        }, 2000
    )
    return timerId
}


// 根据页面状态控制定时器
function visibilityChangeHandler() {
    if (document.hidden) {
        clearInterval(timerId)
    }
    else {
        timerId = startTimer()
    }
}

// 为多个jquery元素绑定 mouseenter 和 mouseleave 时间处理器
function timerToggleListener(element_list) {
    for (let i = 0; i < element_list.length; i++) {

        element_list[i].on('mouseenter', () => {
            clearInterval(timerId)
        }).on('mouseleave', () => {
                timerId = startTimer()
            }
        )
    }
}