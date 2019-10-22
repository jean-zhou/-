/**
  * 设置calendar div中的html部分
  */
function renderHtml() {
  var calendar = document.getElementById("calendar");
  var titleBox = document.createElement("div");  // 标题盒子 
  var bodyBox = document.createElement("div");  // 表格区 显示数据

  // 设置标题盒子中的html，
  titleBox.className = 'calendar-title-box';
  titleBox.innerHTML = "<span class='prev-year' id='prevYear'></span>" +
    "<span class='prev-month' id='prevMonth'></span>" +
    "<span class='calendar-title' id='calendarTitle'></span>" +
    "<span id='nextMonth' class='next-month'></span>" +
    "<span class='next-year' id='nextYear'></span>";
  calendar.appendChild(titleBox);    // 添加到 calendar div中

  // 设置表格里面的html
  bodyBox.className = 'calendar-body-box';
  var _headHtml = "<tr>" +
    "<th>日</th>" +
    "<th>一</th>" +
    "<th>二</th>" +
    "<th>三</th>" +
    "<th>四</th>" +
    "<th>五</th>" +
    "<th>六</th>" +
    "</tr>";
  var _bodyHtml = "";

  // 设置表格的日期 一个月最多31天，所以一个月最多占6行表格
  for (var i = 0; i < 6; i++) {
    _bodyHtml += "<tr>" +
      "<td></td>" +
      "<td></td>" +
      "<td></td>" +
      "<td></td>" +
      "<td></td>" +
      "<td></td>" +
      "<td></td>" +
      "</tr>";
  }
  bodyBox.innerHTML = "<table id='calendarTable' class='calendar-table'>" +
    _headHtml + _bodyHtml +
    "</table>";
  calendar.appendChild(bodyBox);
}

/**
* 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
*/
var dateObj = (function () {
  var _date = new Date();    // 默认为当前系统时间
  return {
    getDate: function () {
      return _date;
    },
    setDate: function (date) {
      _date = date;
    }
  };
})();

/**
 * 获取用户输入的值
 */
function inputData() {
  var inputDay = document.getElementById('input').value
  return inputDay
}

/**
 * 表格中显示的数据
 */
function showCalendarData() {
  var _year = dateObj.getDate().getFullYear();
  var _month = dateObj.getDate().getMonth() + 1;
  var _dateStr = getDateStr(dateObj.getDate());

  // 设置顶部标题栏中的 年、月信息
  var calendarTitle = document.getElementById("calendarTitle");
  var titleStr = _dateStr.substr(0, 4) + "年" + _dateStr.substr(4, 2) + "月";
  calendarTitle.innerText = titleStr;

  var _table = document.getElementById("calendarTable");
  var _tds = _table.getElementsByTagName("td");
  var _firstDay = new Date(_year, _month - 1, 1);  // 当前月第一天，根据传入的参数拿到标准的时间
  for (var i = 0; i < _tds.length; i++) {
    var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
    var _thisDayStr = getDateStr(_thisDay);  //格式化日期为字符串
    _tds[i].innerText = _thisDay.getDate();
    _tds[i].setAttribute('data', _thisDayStr);
    if (_thisDayStr == inputData()) {    // 根据需求，只高亮输入的日期
      _tds[i].className = 'currentDay';
    } else if (_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
      _tds[i].className = 'currentMonth';  // 如果循环的日期的月份是当前月，就设置类名，
    } else {    // 其他月
      _tds[i].className = 'otherMonth';
    }
  }
}

/**
 * 添加日期绑定的事件
 */
function bindAlert() {
  var table = document.getElementById("calendarTable");
  var tds = table.getElementsByTagName('td');
  for (var i = 0; i < tds.length; i++) {
    addEvent(tds[i], 'click', function (e) {
      // log(e.target.getAttribute('data'));
      alert(e.target.getAttribute('data'))
    });
  }
}

/**
* 绑定事件
*/
function bindEvent() {
  var prevMonth = document.getElementById("prevMonth");
  var nextMonth = document.getElementById("nextMonth");
  var prevYear = document.getElementById("prevYear");
  var nextYear = document.getElementById("nextYear");
  addEvent(prevYear, 'click', toPrevYear);
  addEvent(nextYear, 'click', toNextYear);
  addEvent(prevMonth, 'click', toPrevMonth);
  addEvent(nextMonth, 'click', toNextMonth);

}

/**
* 点击上个月图标触发
*/
function toPrevMonth() {
  var date = dateObj.getDate();
  dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  showCalendarData();
}

/**
 * 点击下个月图标触发
 */
function toNextMonth() {
  var date = dateObj.getDate();
  dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  showCalendarData();
}

/**
* 点击上年图标触发
*/
function toPrevYear() {
  var date = dateObj.getDate();
  dateObj.setDate(new Date(date.getFullYear() - 1, date.getMonth(), 1));
  showCalendarData();
}

/**
 * 点击下年图标触发
 */
function toNextYear() {
  var date = dateObj.getDate();
  dateObj.setDate(new Date(date.getFullYear() + 1, date.getMonth(), 1));
  showCalendarData();
}

/**
 * 做输入限制
 */
function showCalender() {
  var inputValue = inputData()
  var regex = /^\d{8}$/
  if (regex.test(inputValue)) {
    renderHtml()
    showCalendarData()
    bindEvent()
    bindAlert()
  } else {
    alert("输入日期不符合规范，请重新输入")
    location.reload()
  }
}