



var addButton = e("#id-button-add")
addButton.addEventListener('click', function(){
    //获得input value的值
    log('点击Add按钮')
    var todoInput = e('#id-input-todo')
    var todo = todoInput.value
    //把获取到的input的输入，添加到container中
    //如何添加，1、先把container选出来，2、然后添加模板的字符串（需要使用一个函数来表示需要添加的）
    var todoContainer = e('#id-div-container')
    //需要写templateTodo的模板函数（可以写在后面，js可以前面调用后面的函数） 不要在一个函数里面套用太多函数，可以在外面写了函数，在里面调用
    // templateTodo 返回t 然后接受t
    var t = templateTodo(todo)
    log("插入之前--------")
    // 使用insertAdjacentHTML 方法插入 html 这个方法 需要两个参数，一个表示插入的位置，另外一个表示插入的内容
    todoContainer.insertAdjacentHTML('beforeend', t)
    //todoContainer是被插入的对象 就是表示插入的东西方法container的结束之前，就是最后
    log("插入之后")
})

//实现函数templateTodo
var templateTodo = function(todo) {
    //模板字符串
    //只是里面的todo需要替换，js使用 ${} 来替换
    var t = `
    <div class="todo-cell">
        <button class="todo-done">完成</button>
        <button class="todo-delete">删除</button>
        <span contenteditable="true">${todo}</span>
    </div>
    `
    return t
    log("插入模板")
}


//现在需要实现的是，后边的完成和删除按钮的功能，
//我们可以对于每添加的一个todo去做绑定，但是这样的话就太复杂了
//所以我们需要引入  事件委托
//事件委托  就是把click事件绑定在事先存好的父元素上
//在运行的时候检查被点击的对象（通过event.target 属性）

var todoContainer = e('#id-div-container')

//通过event.target 的class 来检查点击的是什么
todoContainer.addEventListener('click', function(event){
    log('Container click', event, event.target)
    var target = event.target
    //classList.contains 可以检查元素是否有一个class ， 后面的括号里面的内容就是被检查的对象
    if(target.classList.contains('todo-done')){
        log('done')
        var todoDiv = target.parentElement
        toggleClass(todoDiv, 'done')
    } else if (target.classList.contains('todo-delete')){
        log('delete')
        //这个是找到这个元素的父节点，就是调用parentElement 然后删除
        var todoDiv = target.parentElement
        todoDiv.remove()
    }
})


var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}














、
