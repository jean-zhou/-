// var log = function() {
//     console.log.apply(console, arguments)
// }
//
//使用 e 代替document.querySelector
var e = function(selector) {
    return document.querySelector(selector)
}

//给 ("#id-button-add") 绑定 todo 事件
var addButton = e("#id-button-add")
addButton.addEventListener('click', function(){
    // 1,获得input.value的值
    var todoInput = e('#id-input-todo')
    var todo = todoInput.value
    //log("todo = ", todo)
    // 2,添加到"id-div-container"中 —— Container放在一起
    insertTodo(todo, false)
    // 每一次添加add，需要saveTodos，去保存最新的Todos数组
    saveTodos()
})

var insertTodo = function(todo, done) {
    // 2,添加到"id-div-container"中 —— Container放在一起
    var todoContainer = e('#id-div-container')
    var t = templateTodo(todo, done)
    // 3，使用 insertAdjacentHTML添加元素
    todoContainer.insertAdjacentHTML('beforeend', t)
}

// 在 <div id="id-div-container"> 添加元素——就是多的input 的值，完成和删除
var templateTodo = function(todo, done) {
    var status = ''
    if (done) {
        var status = "done"
    }
    var t = `
    <div class="todo-cell ${status}">
        <button class="todo-done">完成</button>
        <button class="todo-delete">删除</button>
        <span class = 'todo-content' contenteditable="true">${todo}</span>
    </div>
    `
    return t
}

// 使用事件委托，将事件绑定在父节点上
//1）先选中"id-div-container"标签
var todoContainer = e("#id-div-container")
//2）将选出来的"id-div-container"标签绑定事件
todoContainer.addEventListener('click', function(event){
    //log('container click', event, event.target)
    var target = event.target
    // classList.contains 可以检查元素是否有一个 class
    if(target.classList.contains('todo-done')) {
        log('done')
        // 给 todo div 开关一个状态 class
        // 找到按钮的父节点，增加开关状态
        var todoDiv = target.parentElement
        toggleClass(todoDiv, 'done')
        // 每一次添加add，需要saveTodos，去保存最新的Todos数组
        saveTodos()
    } else if (target.classList.contains('todo-delete')){
        log('delete')
        // 找到按钮的父节点并且删除
        //点击事件的target是button，其父节点是用来隔开的div
        var todoDiv = target.parentElement
        todoDiv.remove()
        // 每一次删除，需要saveTodos，去保存最新的Todos数组
        saveTodos()
    }
})

//用一个函数来做开关的效果
var toggleClass = function(element, className) {
    // 检查元素是否拥有某个 classs
    if (element.classList.contains(className)) {
        // 拥有则删除之
    } else {
        // 没有则加上
        element.classList.add(className)
    }
}

//在todo中使用localStorage
//1，定义一个函数， 用于把 数组 写入 localStorage
var save = function(array) {
    var s = JSON.stringify(array)
    log("save , s = ", s)//JSON.stringify 是将array转化成string
    localStorage.todos = s  // 再把转化后的string 存在todos里面——字典

}

// 定义一个函数 把 读取  localStorage，并且解析返回
var load = function() {
    var s =  localStorage.todos
    log("s = ", s)
    return JSON.parse(s)
}

// 定义一个函数， 把页面上的 todo 用save 保存
// 使用 saveTodos (在什么时候调用)
// 每一次添加add，我们就需要saveTodos
// 每一次删除，也需要saveTodos
var saveTodos = function() {
    // 1 先选出所有的 content 标签
    // 2 取出 todo
    // 3 添加到一个 数组中
    // 4 保存数组
    log('save todos')
    var contents = document.querySelectorAll('.todo-content')
    var todos = []
    log('contents, ',contents)
    log("contents.length", contents.length)
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {
            done : done,
            content : c.innerHTML //标签中的字符串
        }
        // 添加到数组中
        todos.push(todo)
        log('for todos = ', todos)
    }
    // 保存数组
    save(todos)
}


var loadTodos = function() {
    // 1,找到todo
    log("load")
    var todos = load()
    log("todos", todos)
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        // 遍历增加insertodo,
        insertTodo(todo.content, todo.done)
    }
    // 需求：显示刚刚存的todos——浏览器 （数据的可视化）
}

loadTodos()
