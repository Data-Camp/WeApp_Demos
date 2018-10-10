package com.generator.heyunchou;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.Map;

public class GeneratorUtil {
	// project  f:/pro/hyc2016/pages/
	public static final String generateOutDir = "F:" + File.separator
			+ "pro" + File.separator+"hyc2016"+File.separator+"pages"+File.separator;
	public static String fileDir = "tool";

	public static void main(String[] args) throws Exception {

		fileDir="tool"; // module name
		generateModule(fileDir);
		/**
		 * result as below
		 * 	生成 F:\pro\hyc2016\pages\tool\tool.js 完成
		 *	生成 F:\pro\hyc2016\pages\tool\tool.wxss 完成
		 *	生成 F:\pro\hyc2016\pages\tool\tool.wxml 完成
		 *
		 */
		
		 
	}
	
	public static void generateModule(String module){
		fileDir=module;
		createFile(generateOutDir);
		createFile(generateOutDir + fileDir);

		generateJsFile(fileDir);
		generateXssFile(fileDir);
		generateXmlFile(fileDir);
		try {
			Runtime.getRuntime().exec("cmd.exe /c start " + generateOutDir+fileDir);			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	/**
	 * mkdir if not exist
	 * 
	 * @param fileName
	 */
	public static void createFile(String fileName) {
		File file = new File(fileName);
		if (!file.exists()) {
			file.mkdir();
		}
	} 
 
	public static void generateJsFile(String file) {
		Map<String, Object> params=new HashMap<String, Object>();
    	params.put("file", file);
		String content=Ftl2String.createHtmlString("index.js", params);
		String fileName=generateOutDir + file+File.separator+file+".js";
		writeFile(fileName,content);
	}
	 
	public static void generateXssFile(String file) {
		Map<String, Object> params=new HashMap<String, Object>();
    	params.put("file", file);
		String content=Ftl2String.createHtmlString("index.wxss", params);
		String fileName=generateOutDir + file+File.separator+file+".wxss";
		writeFile(fileName,content);
	}
	 
	public static void generateXmlFile(String file) {
		Map<String, Object> params=new HashMap<String, Object>();
    	params.put("file", file);
		String content=Ftl2String.createHtmlString("index.wxml", params);
		String fileName=generateOutDir + file+File.separator+file+".wxml";
		writeFile(fileName,content);
	}

	private static void writeFile(String fileName, String content) {
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(new File(
					fileName)));
			writer.write(content);
			writer.close();
			System.out.println("生成 "+fileName+" 完成");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
