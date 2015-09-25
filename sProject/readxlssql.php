<?php
/**
 * XLS parsing uses php-excel-reader from http://code.google.com/p/php-excel-reader/
**@author Jie Tang
**/
header('Content-Type: text/plain');

if (isset($argv[1])) {
    $Filepath = $argv[1];
}
elseif (isset($_GET['File'])) {
    $Filepath = $_GET['File'];
}
else {
    if (php_sapi_name() == 'cli') {
	echo 'Please specify filename as the first argument'.PHP_EOL;
    }
    else {
	echo 'Please specify filename as a HTTP GET parameter "File", e.g., "/test.php?File=test.xlsx"';
    }
    exit;
}

// Excel reader from http://code.google.com/p/php-excel-reader/
require('excel_reader2.php');
require('SpreadsheetReader.php');

date_default_timezone_set('UTC');


try {
    $Spreadsheet = new SpreadsheetReader($Filepath);

    $Sheets = $Spreadsheet -> Sheets();

    foreach ($Sheets as $Index => $Name) {
	$Time = microtime(true);
	$Spreadsheet -> ChangeSheet($Index);

	$sql = "DROP table IF EXISTS Population ;\n" ;


	$sql .= "CREATE table Population (
            	id INT(11) AUTO_INCREMENT PRIMARY KEY,
        	county VARCHAR(50) NOT NULL,
        	state VARCHAR(50) NOT NULL,
        	year int(4) NOT NULL,
        	population int(11) NOT NULL,
        	INDEX county_state_year (county, state, year)
        	)ENGINE=InnoDB ;\n";

	foreach ($Spreadsheet as $Key => $Row) { 
	    if ($Row) {
	        if(preg_match("/([\D ]+), ([\D ]+)/", $Row[0], $matches) && 
		    preg_match("/[\d ,]+/", $Row[3]) &&
		    preg_match("/[\d ,]+/", $Row[6]) &&
		    preg_match("/[\d ,]+/", $Row[7]) &&
		    preg_match("/[\d ,]+/", $Row[8]) &&
		    preg_match("/[\d ,]+/", $Row[9]) &&
		    preg_match("/[\d ,]+/", $Row[10]) &&
		    preg_match("/[\d ,]+/", $Row[11]) ) {
			$tmp_county = mysql_escape_string($matches[1]);
			$tmp_state = mysql_escape_string($matches[2]);
			$sql .= "insert into population (county, state, year, population) values ( '$tmp_county', '$tmp_state', 2010, ".str_replace(',','',$Row[7]).");\n";
			$sql .= "insert into population (county, state, year, population) values ( '$tmp_county', '$tmp_state', 2011, ".str_replace(',','',$Row[8]).");\n";
			$sql .= "insert into population (county, state, year, population) values ( '$tmp_county', '$tmp_state', 2012, ".str_replace(',','',$Row[9]).");\n";
			$sql .= "insert into population (county, state, year, population) values ( '$tmp_county', '$tmp_state', 2013, ".str_replace(',','',$Row[10]).");\n";
			$sql .= "insert into population (county, state, year, population) values ( '$tmp_county', '$tmp_state', 2014, ".str_replace(',','',$Row[11]).");\n";
		    }
	    }
	    else {
		var_dump($Row);
	    }
		
	}
	$myfile = fopen("population.sql", "w") or die("Unable to open file!");
	fwrite($myfile, $sql);
	fclose($myfile);
    }
}
catch (Exception $E) {
    echo $E -> getMessage();
}
?>
