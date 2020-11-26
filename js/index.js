var boxBg = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#564545', '#607d8b', '#405d6b', '#9e9e9e', '#70737d', '#389fa0', '#38a05e', '#b3c981', '#76a803', '#fecf43', '#e2785f']; //box背景色
var bodyBg = ['#F7E8ED', '#F2D9E6', '#ECC6DE', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#E0E1F5', '#F7E8ED', '#F2D9E6', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#DFD1F0', '#616161']; //body背景色

var style = document.createElement('style');
var boxs = document.querySelectorAll('.box');
var rot = ['rotateX(-180deg)', 'rotateY(-180deg)', 'rotateX(180deg)', 'rotateY(180deg)'];
var str = '';
for (let i = 0; i < boxBg.length; i++) {
    str += `.box:nth-child(${i + 1}) div{
        background: ${boxBg[i]} url(images/${i + 1}.png) no-repeat center;
    }`
}
style.innerHTML = str;
document.head.appendChild(style);


for (var i = 0; i < boxs.length; i++) {
    boxs[i].onmouseenter = function(ev) {
        var dir = getDir(ev, this);
        // console.log(dir);
        this.style.transform = 'translateZ(150px)' + rot[dir];
        document.body.style.background = bodyBg[Math.round(Math.random() * (bodyBg.length - 1))]
        console.log(document.body.style.background)
    }
    boxs[i].onmouseleave = function(ev) {
        this.style.transform = '';
    }
}


// Math.atan2(两点之间y轴的差值, 两点之间x轴的差值)  返回两点之间的线与x轴正方向的角度值
function getDir(ev, box) {
    /**     
     * getBoundingClientRect() 返回盒模型的信息
     *      {
     *          width:,
     *          height:,
     *          left:,
     *          top:,
     *          right:,
     *          bottom:,
     *      }
     */
    var l = box.getBoundingClientRect().left;
    var t = box.getBoundingClientRect().top;

    var w = box.offsetWidth;
    var h = box.offsetHeight;

    var x = ev.clientX - l - w / 2;
    var y = ev.clientY - t - h / 2;

    var deg = Math.atan2(y, x) / (Math.PI / 180);

    var d = (Math.round((deg + 180) / 90) + 3) % 4;
    return d // 0, 1, 2, 3
}


var content = document.querySelector('#content');
document.onmousemove = function(ev) {
    var x = (0.5 - ev.clientY / window.innerHeight) * 15;
    var y = (ev.clientX / window.innerWidth - 0.5) * 15;
    content.style.transform = `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`;
}