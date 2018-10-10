package com.generator.heyunchou;
 

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;


public class Ftl2String
{
    
	/**
	 * 
	 * @param ftlName
	 * @param params
	 * @return
	 * @throws IOException
	 * @throws TemplateException
	 */
    public static String createHtmlString(String ftlName, Map<String, Object> params) 
    {
        String resultString;

        // 创建Configuration对象
        Configuration cfg = new Configuration();
        // 设置FreeMarker的模版文件位置
//        cfg.setServletContextForTemplateLoading(
//                ServletActionContext.getServletContext(), ftlPath);
        try {
			cfg.setDirectoryForTemplateLoading(new File(Ftl2String.class.getResource("/template").getPath()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
        cfg.setEncoding(Locale.getDefault(), "utf-8");

        // 创建Template对象
        Template template = null;
        try {
			template = cfg.getTemplate(ftlName);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        template.setEncoding("utf-8");
 

        // 输出流
        StringWriter writer = new StringWriter();
        // 将数据和模型结合生成html
        try {
			template.process(params, writer);
		} catch (TemplateException e) { 
			e.printStackTrace();
		} catch (IOException e) { 
			e.printStackTrace();
		}
        // 获得html
        resultString = writer.toString();

        try {
			writer.close();
		} catch (IOException e) { 
			e.printStackTrace();
		}
        return resultString;
    }
    
    
    public static void main(String[] args) {
//    	System.out.println(Ftl2String.class.getResource("/template").getPath() );
    	
    	Map<String, Object> params=new HashMap<String, Object>();
    	params.put("code", "500730");
    	
		String str=Ftl2String.createHtmlString("preLocal.ftl", params);
		System.out.println(str);
	}

}
