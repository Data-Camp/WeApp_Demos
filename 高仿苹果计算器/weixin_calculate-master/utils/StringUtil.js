/**
 * 格式化数字
 */
function formatNumber(str) {
    var num = unescapeThousands(str);
    return escapeThousands(num);
}

/**
 * 字符串格式的数组转换成数字
 */
function unescapeThousands(str) {
    return parseInt((str || '').replace(/,/g, ''), 10);
}

/**
 * 数字进行千位转换成字符串
 */
function escapeThousands(int) {
    let num = (int || 0).toString(), result = '';
    while(num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}

module.exports.formatNumber = formatNumber;