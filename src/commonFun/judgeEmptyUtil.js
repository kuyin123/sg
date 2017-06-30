/*
 * js判断空的方法
 * by gouxiaojun
 */

var judgType = require('./typeJudgment');
var strUtil = require('./stringUtil');
var objUtil = require('./objectUtil');
var arrUtil = require('./arrayUtil');

/*
 * 判断是否为空
 * */
function isEmpty(value) {
    //1.判读出null,'',0,false,undefined的情况
    if (!value) {
        return true;
    }
    //2.在判断类型
    var type = (judgType.isString(value) && 1) || (judgType.isArray(value) && 2) || (judgType.isObject(value) && 3);
    var status = true;
    //3.判断是否为空
    switch (type) {
        case 1:
            status = strUtil.isEmpty(value);
            break;
        case 2:
            status = arrUtil.isEmpty(value);
            break;
        case 3:
            status = objUtil.isEmptyObj(value);
            break;
        default:
            status = true;
    }
    return status;
}

export default {
    isEmpty
}