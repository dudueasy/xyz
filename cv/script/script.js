// auto change topNavBar background
window.onload= function(){
    window.onscroll=function(){
        var topNavBar = document.querySelector('.topNavBar')
    if (document.documentElement.scrollTop > 0){
            topNavBar.classList.add('sticky')

    }
    else {
            topNavBar.classList.remove('sticky')
        }
    }
}
