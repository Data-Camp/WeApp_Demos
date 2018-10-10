var reader = { 
  readAs: function(type,blob,cb){
	var r = new FileReader();
	r.onloadend = function(){
      if(typeof(cb) === 'function') {
        cb.call(r,r.result);
      }
    }
    try{
      r['readAs'+type](blob);
    }catch(e){}
  }
}

function decode(blob,that){
  reader.readAs('Text',blob.slice(0,blob.size,'text/plain;charset=UTF-8'),function(result){
    result = JSON.parse(result);
    console.log("收到服务器内容2：" + result);
    console.log("收到服务器内容3：" + result.UserInfo);
    that.setData({
        message:result.UserInfo.Message
    });
  });
}

module.exports = {
  decode: decode
}

