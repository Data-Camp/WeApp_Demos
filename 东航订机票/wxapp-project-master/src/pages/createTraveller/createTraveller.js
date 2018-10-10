let app = getApp();
let utils = require('../../utils/utils');
let dateFormat = require('../../utils/dateutil');
Page({
  data:{
        checked:true,
				iconMan:'success',
				iconWoman:'circle',
    },
    onLoad:function(params){
	  let that=this;
    this.type=params.type;
    this.id=params.id;
    let passengerInfo=this.passengerInfo= wx.getStorageSync('passengerInfo');
    this.passengerList=passengerInfo.passengerList;
    this.selectedPassengerList=passengerInfo.selectedPassengerList;
    let data={};
    let nowYear=new Date().getFullYear();
  	let startDate='1900-01-01';
  	let endDateF=dateFormat.formatDay(new Date(nowYear+100,0,1));
  	this.cardTypeKeys=Object.keys(utils.cardTypes);
	  this.cardTypeValues=Object.values(utils.cardTypes);
	  this.customerTypeKeys=Object.keys(utils.customerTypes);
    this.customerTypeValues=Object.values(utils.customerTypes);
	  this.countryOptionValues=[];
	  this.countryOptionKeys=[];
	  this.isInternational=passengerInfo.isInternational;
	  this.productKey=passengerInfo.productKey;
	  if(passengerInfo.isInternational){
	  	this.cardTypeKeys.shift();
	  	this.cardTypeValues.shift();
	  }

	  utils.countryOption.forEach(function(item){
		that.countryOptionValues.push(item.text);
		that.countryOptionKeys.push(item.value);
	  })
  	  Object.assign(data,{
    		cardTypeValues:this.cardTypeValues,
    		cardType:0,
    		startDate:startDate,
      	endDate:dateFormat.formatDay(new Date()),
      	endDateF:endDateF,
      	customerTypeValues:this.customerTypeValues,
      	customerType:0,
      	countryOptionValues:this.countryOptionValues,
      	countryValue:0,
      	checkCityValue:0,
      	isPassport:passengerInfo.isInternational?true:false,
      	isInternational:passengerInfo.isInternational,
      	gender:true,
      	name:'',
      	firstName:'',
      	lastName:'',
      	phone:'',
      	cardNo:'',
      	checkDate:'',
      	passportExpireDate:'',
      	birthday:''
  	  })

      if(this.id!=undefined){
      	let passengerItem= this.passengerList.filter(function(item){
      		return item.ID==that.id;
      	})[0];
      	
      	if(passengerItem){      		
      		let passengerNameEN=passengerItem.PassengerNameEN||'';
      		let firstName=passengerNameEN.split('/')[0]||'';
      		let lastName=passengerNameEN.split('/')[1]||'';
      		let isPassport=utils.isPassport(passengerItem.CardType);
      		Object.assign(data,{      			
      			cardType:passengerItem.CardType?this.cardTypeKeys.indexOf(passengerItem.CardType.toString()):0,
      			name:passengerItem.PassengerName||'',
      			firstName:firstName,
      			lastName:lastName,
      			gender:passengerItem.Gender==1,
      			phone:passengerItem.MobilePhone||'',
      			passportExpireDate: passengerItem.PassportExpireDate?dateFormat.formatDay(new Date(passengerItem.PassportExpireDate)):'',  
      			checkDate:passengerItem.CheckDate?dateFormat.formatDay(new Date(passengerItem.CheckDate)):'', 			
      			birthday:passengerItem.Birthday?dateFormat.formatDay(new Date(passengerItem.Birthday)):'',      			
      			cardNo:passengerItem.CardNo||'',      			
      			customerType:passengerItem.PassengerType?this.customerTypeKeys.indexOf(passengerItem.PassengerType.toString()):0,      			
      			checkCityValue:passengerItem.CheckCityCode?this.countryOptionKeys.indexOf(passengerItem.CheckCityCode):0,
      			countryValue:passengerItem.CountryCode?this.countryOptionKeys.indexOf(passengerItem.CountryCode):0,
      			isPassport:isPassport
      		});
      	}
      }
      this.setData(data);
    },
		changeType:function(e){
      var gender=this.data.gender;
      this.setData({
        gender:!gender
      })
		},
    bindswitchchange:function(e){ 
     this.setData({
            checked:e.detail.value
        })
    },
    bindSelectCardChange:function(e){
    	
    	let type=e.detail.value;
    	let isPassport= utils.isPassport(this.cardTypeKeys[type]);
    	this.setData({
    		isPassport:isPassport,
    		cardType:type
    	});
    },
    bindSelectChange:function(e){
    	let key=e.currentTarget.dataset.key;
    	let data={};
    	data[key]=e.detail.value;
    	this.setData(data);
    },
    formBindsubmit:function(e){
    	var msg='';
    	if(this.isInternational)
    		msg=this.verifyInternational(e.detail.value);
    	else
    		msg=this.verify(e.detail.value);
    	if(msg){
    		utils.message(msg);
    	}else{
        this.submit(e.detail.value);
    	}
    },
    submit:function(value){
    	let that=this;
    	app.globalData.afterLogin.then(()=>{
        if(this.padding)return;
        this.padding=true;
        utils.loadingShow();
    		app.post('api/Passenger/AddPassenger',{
    			    PassengerList:[{
				        "ID":this.id,
                "FirstName": value.firstName,
                "MiddleName": "",
                "LastName": value.lastName,
                "CountryCode": this.countryOptionKeys[value.countryValue],
                "CountryName": this.countryOptionValues[value.countryValue],
                "MobilePhone":  value.phone,
                "IDCardType": this.cardTypeKeys[value.cardType],
                "IDCardNumber": value.cardNo,
                "PassengerType":this.customerTypeKeys[value.customerType],
                "NameCN": value.name,
                "Gender":  value.gender==1,
                "BirthDay":dateFormat.timestamp(value.birthday),
                "Email": '',
                "CheckDate": value.checkDate?dateFormat.timestamp(value.checkDate):'',
                "CheckCity": this.countryOptionValues[value.checkCityValue],
                "CheckCityCode":this.countryOptionKeys[value.checkCityValue],
                "PassportExpireDate": value.passportExpireDate?dateFormat.timestamp(value.passportExpireDate):''
              }],              
            ProductKey:this.productKey
    		}).then(function(data){
            wx.hideToast();
            that.padding=false;
            if(data.Code==4){
              app.login().then(function(){
                utils.message('信息保存失败，请重新点击确定按钮保存！');
              })
            }else if(data.Code==200){
              that.setPassengerInfo(data,value);
              let fn=app.globalData.refreshPassenger;
              if(typeof fn=='function')
                setTimeout(fn,0);
              wx.navigateBack({
                delta:that.type*1
              });
            }else if(data.Msg){
              utils.message(data.Msg);
            }
          }).catch(function(e){
            console.log(e);       
          })
    	}).catch(function(e){
    		console.log(e);    		
    	})
    },
    setPassengerInfo:function(data,value){
    	let newID=data.Data.PassengerIDList[0];
    	let passengerItem={
    		ID:newID,
    		Birthday:value.birthday,
    		CardNo:value.cardNo,
    		CardType:this.cardTypeKeys[value.cardType],
    		CheckCity:this.countryOptionValues[value.checkCityValue],
    		CheckCityCode:this.countryOptionKeys[value.checkCityValue],
    		CheckDate:value.checkDate,
    		City:'',
    		Country:'',
    		CountryName:this.countryOptionValues[value.countryValue],
    		CountryCode:this.countryOptionKeys[value.countryValue],
    		Gender:value.gender==1,
    		MobilePhone:value.phone,
    		PassengerName:value.name,
    		PassengerNameEN:(value.firstName||'') +'/'+(value.lastName||''),
    		PassengerType:this.customerTypeKeys[value.customerType],
    		PassportExpireDate:value.passportExpireDate
    	}

    	
  		this.passengerList=this.passengerList.filter((item)=>{
  			return item.ID!=this.id
  		});
      this.passengerList.unshift(passengerItem);
  		this.selectedPassengerList=this.selectedPassengerList.filter((item)=>{
  			return item!=this.id;
  		});
      this.selectedPassengerList.unshift(newID);
    	wx.setStorageSync('passengerInfo',Object.assign({},this.passengerInfo,{
    		passengerList:this.passengerList,
    		selectedPassengerList:this.selectedPassengerList
    	}))
    }
    ,
    verify:function(value){
    	let msg='';
    	let isPassport=this.data.isPassport;
    	if(!value.name){
    		msg='姓名（中文）不能为空！';
    	}else if(!utils.verifyName(value.name)){
    		msg='姓名（中文）格式错误！';
    	}else if(!utils.verifyPhone(value.phone)){
    		msg='手机号格式错误！';
    	}else if(!value.birthday){
    		msg="生日不能为空！";
    	}else if(!value.cardNo){
    		msg="证件号码不能为空！";
    	}else if(value.cardType==0&&!utils.verifyIdentity(value.cardNo)){
        msg="身份证号码格式错误！";
      }else if(value.cardType==1&&!utils.varifyPassport(value.cardNo)){
        msg='护照格式错误！';
      }
      else if(isPassport&&!value.passportExpireDate){
    		msg="证件有效期不能为空！";
    	}else if(isPassport&&!value.checkDate){
    		msg='证件签发日期不能为空！';
    	}

    	return msg;
    },
    verifyInternational:function(value){
    	let msg='';
    	let isPassport=this.data.isPassport;
    	if(!value.name){
    		msg='姓名（中文）不能为空！';
    	}else if(!utils.verifyName(value.name)){
    		msg='姓名（中文）格式错误！';
    	}else if(!value.firstName){
    		msg='姓（英文）不能为空！';
    	}else if(!utils.verifyFirstName(value.firstName)){
    		msg='姓（英文）格式错误！';
    	}else if(!value.lastName){
    		msg='名（英文）不能为空！';
    	}else if(!utils.verifyLastName(value.lastName)){
    		msg='名（英文）格式错误！';
    	}else if(!utils.verifyPhone(value.phone)){
    		msg='手机号格式错误！';
    	}else if(!value.birthday){
    		msg="生日不能为空！";
    	}else if(!value.cardNo){
    		msg="证件号码不能为空！";
    	}else if(value.cardType==0&&!utils.varifyPassport(value.cardNo)){
        msg='护照格式错误！';
      }else if(!value.passportExpireDate){
    		msg="证件有效期不能为空！";
    	}else if(!value.checkDate){
    		msg='证件签发日期不能为空！';
    	}
    	return msg;
    }
    // ,
    // radioChange:function(e){
    // 	let value=e.detail.value;
    // 	this.setData({
    // 		gender:value==1
    // 	})

    // }
 
})
