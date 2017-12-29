// auto change topNavBar background

setTimeout( ()=> {
    siteWelcome.classList.remove('active')
}, 2000)

window.onscroll=function(){
    var topNavBar = document.querySelector('.topNavBar')
if (document.documentElement.scrollTop > 0) {
        topNavBar.classList.add('sticky')
    }
else {
        topNavBar.classList.remove('sticky')
    }
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

