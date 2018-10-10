<?php
/**
 * Created by PhpStorm.
 * User: vread
 * Date: 2016/11/29
 * Time: 13:36
 */
include_once("inc.php");
$id = $_GET["id"];
foreach($data as $key =>$val){
    if($id == $key){
        $book_detail[$key]=$val;
    }
}
$json = json_encode($book_detail);
echo $json;