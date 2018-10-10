function ajax(opts){
    var xhr=new XMLHttpRequest();
    xhr.onload=opts.success;
    xhr.onerror=opts.fail;
    if(opts.method==="GET"||!opts.methods){
        xhr.open("GET",opts.url+(opts.data ? "?"+serialize(opts.data) : ""),true);
        xhr.send();
    }else{
        xhr.open("POST",opts.url,true);
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(serialize(opts.data));
    }
}

//对象序列化
function serialize (obj) {
    var str = "";
    for (var key in obj) {
        str += key + "=" + obj[key] + "&";
    }
    return str.slice(0, -1);
}

module.exports = {
  ajax: ajax
}