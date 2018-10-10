# xiaochengxuGen
微信小程序页面生成器等工具类
--------------------------------------------------
使用方法：
- GeneratorUtil.generateModule("模块名字"); 

将同时生成模块文件夹，js,wxss,wxml文件
以下是生成tool模块的结果示例
	
	/**
	 * GeneratorUtil.generateModule("tool");
	 * result as below
	 * 	生成 F:\pro\hyc2016\pages\tool\tool.js 完成
	 *	生成 F:\pro\hyc2016\pages\tool\tool.wxss 完成
	 *	生成 F:\pro\hyc2016\pages\tool\tool.wxml 完成
	 *
	 */
## aesUtil 解密数据
接口如果涉及敏感数据（如wx.getUserInfo当中的 openId 和unionId ），接口的明文内容将不包含这些敏感数据。开发者如需要获取敏感数据，需要对接口返回的加密数据( encryptedData )进行对称解密。 解密算法如下：

对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充。
对称解密的目标密文为 Base64_Decode(encryptedData),
对称解密秘钥 aeskey = Base64_Decode(session_key), aeskey 是16字节
对称解密算法初始向量 iv 会在数据接口中返回。

   	onLoad: function () {
    wx.login({
      success: function (res) {

        console.log(res);

        wx.getUserInfo({
          success: function (ddd) {
            console.log(ddd);

          }
        });
        if (res.code) {
          //发起网络请求
          ...
          
	/**
	 * 代码中的测试数据和微信小程序官方提供的一致
	 * @param args
	 */
	public static void main(String[] args) {
		String appid = "wx4f4bc4dec97d474b";
		String sessionKey = "tiihtNczf5v6AKRyjwEUhQ=="; 
		AesUtil util = new AesUtil(appid, sessionKey);  
		String encryptedData=Ftl2String.createHtmlString("enc",null); 
	//		System.out.println(encryptedData); 
		String iv = "r7BXXKkLb8qrSNn05n0qiA=="; 
		util.decryptData(encryptedData, iv);
		
		
		/**
		 * {"openId":"oGZUI0egBJY1zhBYw2KhdUfwVJJE","nickName":"Band","gender":1,"language":"zh_CN",
		 * "city":"Guangzhou","province":"Guangdong","country":"CN",
		 * "avatarUrl":"http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
		 * "unionId":"ocMvos6NjeKLIBqg5Mr9QjxrP1FA","watermark":{"timestamp":1477314187,"appid":"wx4f4bc4dec97d474b"}}
		 *
		 */
	}
