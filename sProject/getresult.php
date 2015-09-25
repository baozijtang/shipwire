<?php
/** 
**retrieve data       
**@author Jie Tang
**/

include_once('db.php'); 
$d = new Database();

$year = $_POST['year']; 
$counties = $_POST['county']; 
$in_clause_array = array();
foreach($counties as $k => $v) {
    $in_clause_array[':c_'.$k] = $v; 
}
$in_clause_string = implode(",", array_keys($in_clause_array));
$d->query("
	SELECT county, state, population , year
	FROM Population 
	WHERE year=:year AND county IN ( $in_clause_string )   
	ORDER by state, county");

$d->bind(':year', $year); 
foreach($in_clause_array as $k => $v ) { 
    $d->bind($k, $v );
} 

$rows = $d->resultset();

$result = array();

$i=0;

foreach($rows as $k => $v) { 
   $state = $v['state'];
   if (!isset($result[$state])) { $i = 0 ; }
   else { 
	$i = count($result[$state]) ; 	
   }
   $result[$state][$i]['county'] = $v['county'];  
   $result[$state][$i]['population'] = $v['population'];
   $i++; 
   
}
//ksort($result);

$data = json_encode($result);
echo $data;
?>
