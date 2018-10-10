package com.xiaochengxu.aes;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;

import com.generator.heyunchou.Ftl2String;

/**
 * 
 *<dl>
 *<dt>类名：AesUtil.java</dt>
 *<dd>描述: 微信小程序AES工具类 ，wx.userInfo()解密 </dd> 
 *<dd>创建时间：2016年11月9日 下午4:06:11</dd>
 *<dd>创建人： Caigen</dd>
 *<dd>更多参考：<a href="http://www.leegtang.com/">微信小程序开发指南</a></dd>
 *</dl>
 */
public class AesUtil {
	private String appid;
	private String sessionKey;
	
	public AesUtil(String appid, String sessionKey) {
		super();
		this.appid = appid;
		this.sessionKey = sessionKey;
	} 
		
	public String decryptData(String content, String iv){  
		try {
			// 设置解密模式为AES的CBC模式
			Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding"); 
			SecretKeySpec key_spec = new SecretKeySpec(Base64.decodeBase64(this.sessionKey), "AES");
			IvParameterSpec wiv = new IvParameterSpec(Base64.decodeBase64(iv));
			cipher.init(Cipher.DECRYPT_MODE, key_spec, wiv); 
			// 使用BASE64对密文进行解码
			byte[] encrypted = Base64.decodeBase64(content); 
			// 解密
			byte[] original = cipher.doFinal(encrypted);  
			byte[] bytes = PKCS7Encoder.decode(original); 
			String res = new String(bytes,"utf-8"); 
			System.out.println(res);
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return null;
	} 

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
	
}
