<?php
/**
 * Created by PhpStorm.
 * User: vread
 * Date: 2016/11/29
 * Time: 11:18
 */
include_once("inc.php");

$booklist = array("code" =>0 ,"success" =>'成功',"data" =>$data,"count"=>4);
$json = json_encode($booklist);
echo $json;
