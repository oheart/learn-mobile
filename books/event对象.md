1. 选取元素
- querySelector: 选取一个
- querySelectorAll: 选取一个或一组
2. 移动端基础事件
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
3. addEventListener 事件监听（推荐使用）
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
4. event对象
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
5. 阻止页面上的文字长按选中和系统菜单
```js
document.addEventListener(
    'touchstart',
    function(e){
        e.preventDefault();
    },
    false
)
```
chrome下报错，改成下面的：
```js
document.addEventListener(
    'touchstart',
    function(e){
        e.preventDefault();
    },
    {
        passive: false
    }
)
```
- e.preventDefault 阻止默认事件，阻止掉document的touchstart事件，可以解决以下问题
    - 阻止页面上的文字被选中
    - 阻止页面上的系统菜单  
- 隐患
  - 页面上所有滚动条失效
- 让部分文字长按可以复制
```js
var copy = document.querySelector('.copy'); // 可以复制的div元素

copy.addEventListener(
    'touchstart',
    function (e) {
        e.stopPropagation();
    },
    false
)
```


