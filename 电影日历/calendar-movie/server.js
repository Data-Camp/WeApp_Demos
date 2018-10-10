//node端网站框架
var express = require('express');
var app = express();

//抓取数据或页面
var request = require('request');
//对页面数据进行提取
var cheerio = require('cheerio');

app.get('/', function(req, res) {
    //top250电影数据可以直接通过api获取
    request({
        json: true,
        url: 'https://api.douban.com/v2/movie/top250',
        qs: {
            start:req.query.start || 0,
            count:req.query.count || 1
        }
    }, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            //请求到电影数据后通过链接alt抓取热评页面，可随机获取一条热评
            request(body.subjects[0].alt+'/comments', function (sError, sResponse, sBody) {
                if (!sError && sResponse.statusCode == 200) {
                    //当前的$,它是拿到了整个body的前端选择器
                    var $ = cheerio.load(sBody);
                    //该页面上只有20条热评
                    var index = Math.ceil(Math.random()*19);
                    body.subjects[0].comment = $("#comments p").eq(index).text();
                    res.send(body);
                }else{
                    res.send("something error");
                }
            })
        }else{
            res.send('something error');
        }
    });
    
});

var port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log( 'Express started on http://localhost:' + port + '; 按Ctrl-C退出。' );
});