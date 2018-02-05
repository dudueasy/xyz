var allButtons = $('#buttons span.button')

for (let i = 0; i < allButtons.length; i++) {
    $(allButtons[i]).on('click', (e) => {

        $('.slides').css({
            'transform': 'translateX(' + (-920 * i) + 'px)'
        })
        allButtons.eq(i).addClass('active').siblings('.active').removeClass('active')
    })
}

var n = 0
var size = $('.slides').children().length;

var timer = setInterval(() => {
    n += 1
    let index = n % size
    allButtons.eq(index).trigger('click')

}, 5000)

$('.window').on('mouseenter', () => {
    clearInterval(timer)
})
$('.window').on('mouseleave', () => {
    timer
})


