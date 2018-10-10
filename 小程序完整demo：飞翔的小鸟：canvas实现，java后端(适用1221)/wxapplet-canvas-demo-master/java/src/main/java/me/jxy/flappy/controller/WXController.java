package me.jxy.flappy.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.primitives.Ints;
import lombok.Data;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Random;

/**
 * flappy-bird排行榜api，仅用于测试
 *
 * @version 1.0
 * @author jiangxy
 */
@Controller
@RequestMapping("/flappy")
public class WXController implements InitializingBean {

    private static Logger logger = LoggerFactory.getLogger(WXController.class);

    /**TOP50排行榜*/
    public static final int LIST_SIZE = 20;

    /**
     * 一个容器，暂存每个用户的成绩
     */
    @Data
    static class Record implements Comparable<Record> {
        private String openId;
        private String name;
        private String pic;
        private Integer score;

        @Override
        public int compareTo(Record o) {
            return Ints.compare(o.score, this.score);
        }
    }

    // 用一个map暂存数据，模拟DB
    // 正常情况下map的key应该是openId的，因为openId才能唯一确认一个用户
    // 但还要解密，懒得搞了。。。用昵称做key吧
    private Map<String, Record> map = Maps.newHashMap();

    /**
     * 汇报一条数据
     *
     * @param record
     * @return
     */
    @RequestMapping("send")
    @ResponseBody
    public synchronized String send(@RequestBody Record record) {
        logger.info("receive record: " + record);
        Record old = map.get(record.getName());
        try {
            if (old == null || record.getScore() > old.getScore()) {
                map.put(record.getName(), record);
            }
        } catch (Exception e) {
            logger.error("update record error", e);
            return "FAIL";
        }

        return "OK";
    }

    /**
     * 获取排行榜
     *
     * @return
     */
    @RequestMapping("getList")
    @ResponseBody
    public synchronized List<Record> getList() {
        List<Record> records = Lists.newArrayList(map.values());
        Collections.sort(records);
        if (records.size() < LIST_SIZE)
            return records;
        else
            return records.subList(0, LIST_SIZE);
    }

    /**
     * 检查API是否正常
     *
     * @return
     */
    @RequestMapping("status")
    @ResponseBody
    public String status() {
        logger.info("check api status");
        return "OK";
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        Random rand = new Random();
        // 生成一些测试数据
        for (int i = 0; i < 50; i++) {
            Record record = new Record();
            record.setName(String.format("我是用户%02d号", i));
            int score = rand.nextInt(50);
            record.setScore(score);
            map.put(record.getName(), record);
        }
    }

}
