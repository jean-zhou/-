/*课程七笔记

一、数据类型
数字、
字符串、
布尔值
对象

null 和 undefine
函数也是一个类型

在js中变量也可以不用var声明，但是这个时候这个变量就是全局变量


二、多行字符串 - 模板字符串
多行字符串可以回车，单行字符串不接受回车


三、转义字符串
转的是斜杠后边字符的意思，后边的字符就不是以前的那个意思
\n 换行
\t tab
\\ 斜杠
\' 单引号
\" 双引号


四、高阶函数、匿名函数

var log = function() {
    console.log.apply(console, arguments);
}
//首字母大写的Srting是内置的函数
log("String", String(6.3))

//array 是一个数组、processor是一个函数（函数作为参数）
// 此函数的作用 把array中的每个元素都用processor处理，并返回一个新的列表

var process = function(array, processor) {
    var l = []
    for ( var i = 0; i < array.length; i++) {
        var a = array[i]
        var element = processor(a)
        //通过函数 处理数组
        //然后把数组组成新的数组
        li.push(element)
        //这里的push（）是调用的一个方法，所以需要写成小括号，定义的数组才是中括号

    }
    return li
}

// 创建一个array 包含 3 个number
var array = [1.1, -2.2, 3.3]

// String 的内置函数
var stringList = process(array, String )
log("stringList", stringList)

//Math.floor 可以把小数转换成整数  内置的函数首字母要大写
var stringList = process(array, Math.floor )
log("stringList", stringList)

2、匿名函数

例如1：
var square = function() {
    return n * n
}
其实这里就是一个匿名函数，是定义了一个square函数，然后将一个匿名函数赋值给了这个变量

例如2：
//直接不先定义函数，要使用的时候，直接写在里面
var addList = process(array, function( n ) {
    return n + 1
})
log("addList", addList)

五，事件委托
 1，原因
 todo的例子
 进行到往html中添加todo的事件
 下一步需要对于添加的button进行处理（继续进行事件处理）：完成就删除线，删除就没有
 如果我们对于每一次添加进来的todo都单独处理，事情就会变得特别麻烦，
 这样处理的方法如下：
 var addButton = e("#id-button-add")
 addEventListener('click', function(){
     // 1,获得input.value的值
     var todoInput = e('id-input-todo')
     var todo = todoInput.value
     // 2,添加到"id-div-container"中 —— Container放在一起
     var todoContainer = e('"id-div-container"')
     var t = templateTodo(todo)
     // 3，使用 insertAdjacentHTML添加元素
     todoContainer.insertAdjacentHTML('beforeend', t)
     ////我们可以在这个最后，对于插入进来的元素，进行操作，
 })

 这样还是太麻烦，所以可以使用 事件委托 ，可以自动对于添加的button绑定事件

 2，具体方法：
    1）我们可以把 click 事件绑定在事先存在的父元素（"id-div-container"）上
    2）然后在运行的时候检查 被 点击的对象(通过 event.target 属性)，是否是我们需要的对象

































*/
