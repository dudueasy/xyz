// auto change topNavBar background

setTimeout( ()=> {
    siteWelcome.classList.remove('active')
    onscrollAnimation()
}, 1000)

window.onscroll=function(){
    var topNavBar = document.querySelector('.topNavBar')
    if (document.documentElement.scrollTop > 0) {
            topNavBar.classList.add('sticky')
        }
    else {
            topNavBar.classList.remove('sticky')
        }

    onscrollAnimation()


}

function onscrollAnimation() {
    let specialTags = document.querySelectorAll('[data-x]')
    let minIndex = 0
    for(let i =0; i<specialTags.length; i++) {
        if(Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
            minIndex = i
        }
    }
    // minIndex 离页面顶部最近的元素的索引
    specialTags[minIndex].classList.remove('offset')
    let id = specialTags[minIndex].id

    let a = document.querySelector('a[href="#' + id +'"]')
    let li = a.parentNode
    let liSiblings = li.parentNode.children

    for(let i =0; i<liSiblings.length; i++){
        liSiblings[i].classList.remove('highlight')
    }

    li.classList.add('highlight')
}


window.onload = function () {
    let liTags = document.querySelectorAll('nav.menu >ul >li')

    for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function (e) {
            e.currentTarget.classList.add('active')
        }

        liTags[i].onmouseleave = function (e) {
            e.currentTarget.classList.remove('active')
        }
    }

    function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    requestAnimationFrame(animate);

    let aTags = document.querySelectorAll('nav.menu > ul > li> a')

    for (let i = 0; i < aTags.length; i++) {
        aTags[i].onclick = function (x) {
            x.preventDefault()
            let top = document.querySelector(x.currentTarget.getAttribute('href')).offsetTop
            let currentTop = window.scrollY
            let targetTop = top - 80

            let coords = { y: currentTop };
            let tween = new TWEEN.Tween(coords)
                .to({ y: targetTop }, 500)
                .easing(TWEEN.Easing.Quadratic.In)
                .onUpdate(function() {
                    window.scrollTo(0, coords.y)
                })
                .start();
        }
    }
}

