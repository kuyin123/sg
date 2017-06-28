/**
 * Created by cqc168 on 2017/6/28.
 */

// 常用正则判断
// 1. 手机号: 必须以1开头的十一位数字
const regPhoneNo = /^1\d{10}$/;

// 2. 邮箱地址
const regEMail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

export default {
	regPhoneNo,
	regEMail
}