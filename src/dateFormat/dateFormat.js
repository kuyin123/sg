/**
 * Created by cqc168 on 2017/6/28.
 */

// 日期 时间 格式化工具
// 前一天
var prevHour = function(src) {
  return new Date(src.getTime() - 24 * 60 * 60 * 1000);
};

// 前一周
var prevWeek = function(src) {
  return new Date(src.getTime() - 7 * 24 * 60 * 60 * 1000);
};

// 前一月
var prevMonth = function(src) {
  const year = src.getFullYear();
  const month = src.getMonth();
  const date = src.getDate();

  const newYear = month === 0 ? year - 1 : year;
  const newMonth = month === 0 ? 11 : month - 1;

  const newMonthDayCount = new Date(newYear, newMonth + 1, 0).getDate() //getDayCountOfMonth(newYear, newMonth);
  if (newMonthDayCount < date) {
    src.setDate(newMonthDayCount);
  }

  src.setMonth(newMonth);
  src.setFullYear(newYear);

  return new Date(src.getTime());
};

// 前一年
var prevYear = function(src) {
  var date = new Date(src);
  date.setFullYear(date.getFullYear() - 1);
  return date;
};

// 时间 根据传入条件格式化
var format = function(date, fmt) { //author: meizz
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

export default {
  prevHour,
  prevWeek,
  prevMonth,
  prevYear,
  format
}
