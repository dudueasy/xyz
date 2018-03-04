window.addEventListener('scroll', () => {
    navBarStickySwitch()
})

// 顶部导航sticky状态针对滚动事件的响应
function navBarStickySwitch() {
    let topNavBar = document.querySelector('.topNavBar')
    if (document.documentElement.scrollTop > 0) {
        topNavBar.classList.add('sticky')
    }
    else {
        topNavBar.classList.remove('sticky')
    }
}