// auto change topNavBar background
window.onload= function(){window.onscroll=function(){
    
    if (document.documentElement.scrollTop > 0){
        document.querySelector('.topNavBar').style.background = "white"
        document.querySelector('.topNavBar nav').style.color = "black"
        document.querySelector('.topNavBar').classList.add("shadowed")

    }
    else {
        document.querySelector('.topNavBar').style.background = "transparent"
        document.querySelector('.topNavBar nav').style.color = "rgba(255, 255, 255, 0.7)"
        document.querySelector('.topNavBar').classList.remove("shadowed")   
        }
    }
}
