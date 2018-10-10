var Stack = function(){}
Stack.prototype={
    Init:function(){
        this.STACKMAX = 100;
        this.stack = new Array(this.STACKMACK);
        this.top = -1;
        return this.stack;
    },
    isEmpty:function(){
        if(this.top==-1){
            return true;
        }
        else{
            return false;
        }
    },
    push:function(elem){
        if(this.top==this.STACKMAX-1){
            return "栈满";
        }
        else{
            this.top++;
            this.stack[this.top] = elem;
        }
    },
    pop:function(){
        if(this.top==-1){
            return "空栈,无法删除栈顶元素！";
        }
        else{
            var x = this.stack[this.top];
            this.top--;
            return x;
        }
    },
    peek:function(){
        if(this.top!=-1){
            return this.stack[this.top];
        }
        else{
            return "空栈，顶元素无返回值！";
        }
    },
    Clear:function(){
        this.top=-1;
    },
    Length:function(){
        return this.top+1;
    }
}

function toRPolish(s){
	var list=new Array();
	var op=new Stack();
	op.Init();
	//var num=str.match(/\d+(\.\d+)?/g);
	var i=0;
	while(i<s.length){
		var c=s.charAt(i);
		if(c>='0'&&c<='9'){
			var s1=s.substr(i);
			var m=s1.match(/\d+(\.\d+)?/g);
			if (m.length>0){
				s1=m[0];
				list.push(s1);
			}
			i=i+s1.length;
			continue;
		}else if(c=='('){
			op.push(c);
		}else if(c==')'){
			var p=op.pop();
			while(p!='('){
				list.push(p);
				p=op.pop();
			}
		}else if(c=='+'||c=='-'){
			while(!op.isEmpty()&&(op.peek()=='+'||op.peek()=='-'||op.peek()=='×'||op.peek()=='÷')){
				list.push(op.pop());
			}
			op.push(c);
		}else if(c=='×'||c=='÷'){
			while(!op.isEmpty()&&(op.peek()=='×'||op.peek()=='÷')){
				list.push(op.pop());
			}
			op.push(c);
		}
		i++;
	}
	while(!op.isEmpty()){
		list.push(op.pop());
	}
	return list;
}

function g(a,b,c){
	var v=0;
	a=parseFloat(a);
	b=parseFloat(b);
	switch (c){
        case '+':
            v=floatAdd(a,b);
            break;
        case '-':
            v=floatSub(a,b);;
            break;
        case '×':
            v=floatMul(a,b);;
            break;
        case '÷':
            v=floatDiv(a,b);;
            break;
    }
    return v;
}

function getResult(list,result){
	for (var i=0;i<list.length;i++){
		if(!isNaN(list[i])){
			result.push(list[i]);
		}else{
			var b=result.pop();
			var a=result.pop();
			var v=g(a,b,list[i]);

			result.push(v);
		}
	}
	return result.pop();
}

function calculate(input){
    console.log(input);
    var list=toRPolish(input);
    console.log(list);
    var result=new Stack();
    result.Init();
    return getResult(list, result);
}
 

//浮点数加法运算
function floatAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}

//浮点数减法运算
function floatSub(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //动态控制精度长度
    n=(r1=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}

//浮点数乘法运算
function floatMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}


 //浮点数除法运算
function floatDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
    r1=Number(arg1.toString().replace(".",""));
    r2=Number(arg2.toString().replace(".",""));
    return (r1/r2)*Math.pow(10,t2-t1);
}
 
module.exports = {
  calculate:calculate
}
