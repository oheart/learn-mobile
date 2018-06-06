## 选取元素
- querySelector: 选取一个
- querySelectorAll: 选取一个或一组
## 移动端基础事件
- touchstart 手指触摸 <--> 相当于pc的mousedown
- touchmove 手指一动  <--> 相当于pc的mousemove
- touchend 手指离开   <--> 相当于pc的mouseup
```js
var box = document.querySelector('.box');

box.ontouchstart = function () {
    console.log('touchstart')
}

box.ontouchmove = function () {
    console.log('touchmove')
}

box.ontouchend = function () {
    console.log('touchend')
}
```
- 注：
    - touch事件，在chrome浏览器下，部分版本通过on的方式来添加事件无效。
    --> addEventListener
    - on多次添加重复事件会覆盖
## addEventListener 事件监听（推荐使用）
- 概念：
    - addEventListener('事件名','函数->匿名或者有名函数','冒泡或捕获, 默认为 false')
    - 不会存在前后覆盖问题(on多次添加重复事件会覆盖，addEventListener不会)
    - 在chrome模拟器下可以一直识别
```js
var box = document.querySelector('.box');

box.addEventListener(
    'touchstart',
    function(){
        console.log('touchstart')
    },
    false
)

box.addEventListener(
    'touchmove',
    function(){
        console.log('touchmove')
    },
    false
)

box.addEventListener(
    'touchend',
    function(){
        console.log('touchend')
    },
    false
)
```
## event对象
```js
var box = document.querySelector('.box');

box.addEventListener(
    'touchstart',
    function(e){
        console.log('event对象：', e);
    },
    false
)
/*
    事件函数中默认的第一个参数是event对象
*/
```
## 阻止页面上的文字长按选中和系统菜单
```js
document.addEventListener(
    'touchstart',
    function(e){
        e.preventDefault(); // 阻止默认事件
    },
    false
)
```
chrome下报错，改成下面的：
```js
document.addEventListener(
    'touchstart',
    function(e){
        e.preventDefault(); // 阻止默认事件
    },
    {
        passive: false
    }
)
```
- e.preventDefault 阻止默认事件，阻止掉document的touchstart事件，可以解决以下问题
    - 阻止页面上的文字被选中（可以通过阻止冒泡使某个元素上的文字被选中）
    - 阻止页面上的系统菜单  
- 隐患
  - 页面上所有滚动条失效
- 让部分文字长按可以复制

注： 可以通过阻止冒泡使某个元素上的文字被选中

```js
var copy = document.querySelector('.copy'); // 可以复制的div元素

copy.addEventListener(
    'touchstart',
    function (e) {
        e.stopPropagation();   // 阻止冒泡
    },
    false
)
```
## 阻止document的touchstart 或者 touchmove，可以清除系统默认的回弹
```js
document.addEventListener(
	"touchstart",
	function(e) {
		e.preventDefault();
	}
);
```
```js
document.addEventListener(
	"touchmove",
	function(e) {
		e.preventDefault();
	}
);
```
## 事件点透问题

pc端的鼠标事件在移动端也可以正常使用，但是注意事件的执行会有300ms的延迟.  

    **事件点透：** 
    - 在移动端pc事件有300ms的延迟
    - 我们点击了页面之后，浏览器会记录点击下去的坐标
    - 300ms之后，在该坐标找到现在在这的元素执行事件
    ** 解决办法 **
    - 阻止默认事件, e.preventDefault()（部分安卓机型不支持）
    - 不在移动端使用鼠标事件，不用a标签做页面跳转，用location
## 误触问题处理  

解决a标签误触问题和点透问题:
```html
<a href="https://www.baidu.com/">
    链接1
</a>
<a href="https://www.baidu.com/">
    链接2
</a>
<a href="https://www.baidu.com/">
    链接3
</a>
<a href="https://www.baidu.com/">
    链接4
</a>
<a href="https://www.baidu.com/">
    链接5
</a>
```
```css
a{
    width: 50px;
    height: 50px;
    display: block;
    background: red;
    margin: 20px;
}
```
```js
// 禁止href点击的默认统一跳转
document.addEventListener(
    'touchstart',
    function(e){
        e.preventDefault();
    },
    {
        passive: false
    }
)

window.onload = function(){
    //  获取页面上所有a标签
    var a = document.querySelectorAll('a');
    // 遍历页面上所有a标签
    for(var i = 0; i < a.length; i++){
        a[i].addEventListener(
            'touchmove',
            function(){
                this.isMove  = true;
            }
        )
        a[i].addEventListener(
            'touchend',
            function(){
                if(!this.isMove){
                    window.location.href = this.href;
                }
                this.isMove = false;
            }
        )
    }
}
```

## touchEvent
- touches   -> 获取当前屏幕上的手指列表
- targetTouches -> 获取当前元素上的手指列表
- changedTouches -> 获取触发当前事件的手指列表 (用的较多)
```html
<div id="box"></div>
```
```css
* {
    margin: 0;
    padding: 0;
}

#box {
    width: 200px;
    height: 200px;
    background: red;
    font-size: 30px;
    color: #FFF;
}
```
```js
var box = document.querySelector('#box');

box.addEventListener(
    'touchend',
    function (e) {
        var touch = e.changedTouches[0];
        this.innerHTML = touch.pageX  + '|' + touch.pageY;
    }
)
```
## 滑屏原理
```html
<div id="wrap">
    <div id="scroll">
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
            民国时期高考题长这样！别说英文了，汉语题看了都慌<br/>
    </div>
</div>
```
```css
* {
    margin: 0;
    padding: 0;
}
html{
    height: 100%;
}
body{
    height: 100%;
    position: relative;
    overflow: hidden;
}
#wrap{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
#scroll{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
}
```
```js
/*
    1. 手指按下去的时候，记录下手指坐标
    2. 移动的时候，记录手指坐标
    3. 用移动后的坐标 - 移动前的坐标 = 手指移动的距离
    4. 手指按下的时候，记录下元素的位置
    5. 移动之后，元素的初始位置 + 用手指移动的距离  = 元素现在所要在的位置
*/
window.onload = function(){
    var wrap = document.querySelector('#wrap');
    var scroll = document.querySelector('#scroll');

    var startPoint = 0; // 手指移动前的坐标
    var startEl = 0; // 元素开始坐标
    wrap.addEventListener(
        'touchstart',
        function(e){
            var touch = e.changedTouches[0];
            startPoint = touch.pageY;
            startEl = scroll.offsetTop;
        }
    )
    wrap.addEventListener(
        "touchmove",
        function(e){
            var touch = e.changedTouches[0];
            var nowPoint = touch.pageY;    // 当前的手指坐标
            var dis = nowPoint - startPoint;  // 手指移动的距离
            var top = startEl + dis;  // 获取元素现在所在的位置（元素的初始位置 + 手指移动的距离）
            console.log('dis', dis)
            scroll.style.top = top + 'px';  // 设置元素现在所在的位置
        }
    )
}
```
## 完善滑屏--边界范围限制
```html
<div id="wrap">
    <div id="scroll">
        民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/> 民国时期高考题长这样！别说英文了，汉语题看了都慌
        <br/>
    </div>
</div>
```
```css
* {
    margin: 0;
    padding: 0;
}

html {
    height: 100%;
}

body {
    height: 100%;
    position: relative;
    overflow: hidden;
}

#wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

#scroll {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #ccc;
}
```
```js
/*
    1. 手指按下去的时候，记录下手指坐标
    2. 移动的时候，记录手指坐标
    3. 用移动后的坐标 - 移动前的坐标 = 手指移动的距离
    4. 手指按下的时候，记录下元素的位置
    5. 移动之后，元素的初始位置 + 用手指移动的距离  = 元素现在所要在的位置
*/
window.onload = function () {
    var wrap = document.querySelector('#wrap');
    var scroll = document.querySelector('#scroll');

    var startPoint = 0; // 手指移动前的坐标
    var startEl = 0; // 元素开始坐标
    var maxTop = wrap.clientHeight - scroll.offsetHeight; // 能向上移动的最大距离
    console.log('maxTop', maxTop);
    wrap.addEventListener(
        'touchstart',
        function (e) {
            var touch = e.changedTouches[0];
            startPoint = touch.pageY;
            startEl = scroll.offsetTop;
        }
    )
    wrap.addEventListener(
        "touchmove",
        function (e) {
            var touch = e.changedTouches[0];
            var nowPoint = touch.pageY;    // 当前的手指坐标
            var dis = nowPoint - startPoint;  // 手指移动的距离
            var top = startEl + dis;     // 获取元素现在所在的位置（元素的初始位置 + 手指移动的距离）
            console.log('dis', dis);
            if(top > 0){
                top  = 0;
            }
            if(top < maxTop){
                top = maxTop;
            }
            scroll.style.top = top + 'px';  // 设置元素现在所在的位置
        }
    )
}
```
