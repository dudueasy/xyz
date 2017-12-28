// auto change topNavBar background

window.onscroll=function(){
    var topNavBar = document.querySelector('.topNavBar')
if (document.documentElement.scrollTop > 0){
        topNavBar.classList.add('sticky')
}
else {
        topNavBar.classList.remove('sticky')
    }
}

window.onload = function () {
    let liTags = document.querySelectorAll('nav.menu >ul >li')


    for(let i =0; i<liTags.length; i++){
        liTags[i].onmouseenter = function (e) {
            e.currentTarget.classList.add('active')
        }

        liTags[i].onmouseleave = function (e) {
            e.currentTarget.classList.remove('active')
        }
    }

    let aTags = document.querySelectorAll('nav.menu > ul > li> a')
    for(let i =0; i<aTags.length; i++){
        aTags[i].onclick = function (x) {
            x.preventDefault()
            let a = x.currentTarget
            let href = a.getAttribute('href')
            let element = document.querySelector(href)
            let top = element.offsetTop
            top -= 80
            console.log(top)
            window.scrollTo(0, top)

        }
    }
}


