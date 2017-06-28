/*sg-utils-reg 2017-06*/

// 常用正则判断
// 传入要验证的字符串, 返回 Boolean 值.

// 1. 手机号: 1开头的十一位数字
var regPhoneNo = function (str) {
	return /^1\d{10}$/.test(str);
}

// 2. 邮箱地址
var regEMail = function (str) {
	return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(str);
}

// 3. 用户名: 字母、数字、下划线开头，1-16位
var regUserName = function (str) {
	return /^\w{1,16}$/.test(str);
}

// 4. 用户密码: 密码由数字、字母、特殊字符开头、组成且密码长度为1~16个字符
var regPassword = function (str) {
	// return /^[A-Za-z0-9_#@$%^&*()~]{1,16}$/.test(str);
	return /^[\w#@$%^&*()~]{1,16}$/.test(str);
}

// 5. 标准日期时间格式(yy/mm/dd hh:mm:ss 或者 yy-mm-dd hh:mm:ss)判断
var regDateFormat = function (str) {
	return /^\d{4,}(\/|-)(?:0?\d|1[12])(\/|-)(?:[012]?\d|3[01]) (?:[01]?\d|2[0-4]):(?:[0-5]?\d|60):(?:[0-5]?\d|60)$/.test(str);
}

export default {
	regPhoneNo,
	regEMail,
	regUserName,
	regPassword,
	regDateFormat
}