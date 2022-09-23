function resSize() {
    //获取设置的宽度
    var devicesWidth = document.documentElement.clientWidth || window.innerWidth
    if (devicesWidth >= 750) {
        devicesWidth = 750
    }
    if (devicesWidth <= 320) {
        devicesWidth = 320
    }
    //750px-->1rem=100px,375px-->1rem=50px
    document.documentElement.style.fontSize = (devicesWidth / 7.5) + 'px'
    //设置字体大小
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
resSize()
//当窗口发生变化调用
window.onresize = function () {
resSize()
}