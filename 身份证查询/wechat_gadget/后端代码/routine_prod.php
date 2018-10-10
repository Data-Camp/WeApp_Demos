<?php
/**
 * 微信小程序的日常接口调用
 * User: cory
 * Date: 2016/11/11
 * Time: 10:40
 */

$type = trim($_GET['type']);
$key = '';

switch ($type){
    case 'card' :
        $key = '86f79e974dd392f4c48e226aa3f8ed0c';
        $cardno = $_GET['cardno'];
        $get_res = file_get_contents('http://apis.juhe.cn/idcard/index?cardno='.$cardno.'&key='.$key );
        echo $get_res;
        break;

    default:
        die('error : no type 404');
}