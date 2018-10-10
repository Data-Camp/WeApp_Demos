/**!
 *
 * Copyright(c) boyce and other contributors.
 * MIT Licensed
 *
 * Authors:
 *  boyce <boyce.ywr@gmail.com> (http://www.jianshu.com/users/9b5b907d9bce)
 */

'use strict'

const STATE = {
    INIT: 0,  //初始状态
    RESULT: 1,  //结果状态
    FIRST_UNDOT: 2,  //记录第一个操作数，且该操作数没有小数点
    FIRST_DOT: 3,   //记录第一个操作数，且该操作数有小数点
    SECOND_UNDOT: 4, //记录第二个操作数，且该操作数没有小数点
    SECOND_DOT: 5 //记录第二个操作数，且该操作数有小数点
}

let curState = STATE.INIT  //状态机所在状态
let curResult = 0   //计算结果
let opNum1 = '0'   //操作数1
let opNum2 = ''  //操作数2
let op = ''   //操作符

let displayNum = opNum1 //界面上应当显示的数值
let displayOp = ""  //界面上应当显示的操作符

/**
 * 重置程序状态
 */
function reset() {
    curState = STATE.INIT
    curResult = 0
    opNum1 = '0'
    opNum2 = ''
    op = ''
}

/**
 * 是否为零
 */
function isZero(code) {
    return code == '0'
}

/**
 * 是否数字
 */
function isNumber(code) {
    return code >= '0' && code <= '9'
}

/**
 * 是否操作符
 */
function isOperator(code) {
    return code == '+' || code == '-'
        || code == 'x' || code == '/' || code == '%'
}

/**
 * 是否小数点
 */
function isDot(code) {
    return code == '.'
}

/**
 * 是否是等号
 */
function isEquel(code) {
    return code == '='
}

/**
 * 是否清楚
 */
function isClear(code) {
    return code == 'c'
}

/**
 * 是否删除
 */
function isDelete(code) {
    return code == 'd'
}

/**
 * 转换为可现实的操作符
 */
function op2Show(code) {
    return code == '/' ? '÷' : (code == 'x' ? '×' : code)
}

/**
 *
 */
function tryAppend(num, code) {
    if (num.length < 15) {
        num += code
    }
    return num
}

function tryTrunc(num) {
    let str = '' + num
    if (str.length > 15) {
        str = str.substr(0, 15)
    }
    return str
}

/**
 *
 */
function tryDelete() {
    if (curState == STATE.SECOND_DOT
        || curState == STATE.SECOND_UNDOT) {
        if (opNum2.length > 0) {
            opNum2 = opNum2.substr(0, opNum2.length - 1)
        }
        if (opNum2 == '') {
            opNum2 = '0'
        }
        return
    } else {
        if (opNum1.length > 0 && opNum1 != '0') {
            opNum1 = opNum1.substr(0, opNum1.length - 1)
        }
        if (opNum1 == '') {
            opNum1 = '0'
        }
        return
    }
}

function tryCalc() {
    let n1 = parseFloat(opNum1)
    let n2 = parseFloat(opNum2)
    switch (op) {
        case '+':
            curResult = n1 + n2
            break
        case '-':
            curResult = n1 - n2
            break
        case 'x':
            curResult = n1 * n2
            break
        case '/':
            if (n2 == 0) {
                reset()
                curResult = 'NaN'
                displayOp = ''
            } else {
                curResult = n1 / n2
            }
            break
        case '%':
            if (n2 == 0) {
                reset()
                curResult = 'NaN'
                displayOp = ''
            } else {
                curResult = n1 % n2
            }
            break
    }
    curResult = tryTrunc(curResult)
}

function addOp(code) {
    switch (curState) {
        case STATE.RESULT:
        case STATE.INIT:
            if (isNumber(code) && !isZero(code)) {
                curState = STATE.FIRST_UNDOT
                opNum1 = code
            } else if (isDot(code)) {
                curState = STATE.FIRST_DOT
                opNum1 = '0.'
            } else if (isOperator(code)) {
                curState = STATE.SECOND_UNDOT
                opNum1 = '0'
                opNum2 = ''
                op = code
            }
            displayNum = opNum1
            displayOp = ''
            break
        case STATE.FIRST_UNDOT:
            displayOp = ''
            if (isNumber(code)) {
                if (!isZero(opNum1)) {
                    opNum1 = tryAppend(opNum1, code)
                } else {
                    opNum1 = code
                }
            } else if (isDot(code)) {
                curState = STATE.FIRST_DOT
                opNum1 = opNum1 == '' ? '0' : tryAppend(opNum1, '.')
            } else if (isDelete(code)) {
                tryDelete()
            } else if (isOperator(code)) {
                curState = STATE.SECOND_UNDOT
                op = code
                opNum2 = ''
                displayOp = op
            }
            displayNum = opNum1
            break
        case STATE.FIRST_DOT:
            displayOp = ''
            if (isNumber(code)) {
                opNum1 = tryAppend(opNum1, code)
            } else if (isDelete(code)) {
                tryDelete()
                if (opNum1.indexOf('.') < 0)
                    curState = STATE.FIRST_UNDOT
            } else if (isOperator(code)) {
                curState = STATE.SECOND_UNDOT
                op = code
                opNum2 = ''
                displayOp = op
            }
            displayNum = opNum1
            break
        case STATE.SECOND_UNDOT:
            if (isNumber(code)) {
                if (!isZero(opNum2)) {
                    opNum2 = tryAppend(opNum2, code)
                } else {
                    opNum2 = code
                }
                displayNum = opNum2
            } else if (isDot(code)) {
                curState = STATE.SECOND_DOT
                opNum2 = opNum2 == '' ? '0' : tryAppend(opNum2, '.')
                displayNum = opNum2
            } else if (isDelete(code)) {
                tryDelete()
                displayNum = opNum2
            } else if (isOperator(code)) {
                if (opNum2 != '') {
                    //直接计算
                    tryCalc()
                    curState = STATE.SECOND_UNDOT
                    opNum1 = curResult
                    opNum2 = ''
                    displayNum = curResult
                }
                op = code
                displayOp = op
            } else if (isEquel(code)) {
                if (opNum2 != '') {
                    tryCalc()
                    curState = STATE.RESULT
                    opNum1 = '0'
                    opNum2 = ''
                    displayNum = curResult
                }
                op = code
                displayOp = op
            }
            break
        case STATE.SECOND_DOT:
            if (isNumber(code)) {
                opNum2 = tryAppend(opNum2, code)
                displayNum = opNum2
            } else if (isDelete(code)) {
                tryDelete()
                if (opNum2.indexOf('.') < 0)
                    curState = STATE.SECOND_UNDOT
                displayNum = opNum2
            } else if (isOperator(code)) {
                if (opNum2 != '') {
                    //直接计算
                    tryCalc()
                    curState = STATE.SECOND_UNDOT
                    opNum1 = curResult
                    opNum2 = ''
                    displayNum = curResult
                }
                op = code
                displayOp = op
            } else if (isEquel(code)) {
                if (opNum2 != '') {
                    tryCalc()
                    curState = STATE.RESULT
                    opNum1 = '0'
                    opNum2 = ''
                    displayNum = curResult
                }
                op = code
                displayOp = op
            }
            break
    }
    if (isClear(code)) {
        reset()
        displayNum = opNum1
        displayOp = ''
    }
    displayOp = op2Show(displayOp)
}

reset()

module.exports = {
    reset, addOp, getVars(){
        return {curState, curResult, opNum1, opNum2, op, displayNum, displayOp}
    }
}
