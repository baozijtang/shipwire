<?php
/** 
**retrieve data       
**@author Jie Tang
**/
include_once('db.php'); 
$d = new Database();
$d->query("
	SELECT distinct county 
	FROM Population   
	ORDER by county ");
$rows = $d->resultset();
$data =  json_encode($rows);
echo $data;
?>
