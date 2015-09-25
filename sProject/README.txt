/*
PHP sample problem 
by Jie Tang 
URL: http://myweb/index.html
Date: September 20, 2015
*/
-------------------------------------------------------------------------------------

1. Requirements
2. File path
3. Load data into database 
4. Web form 
5. Optional/Bonus problem 

-------------------------------------------------------------------------------------

Requirement:
Take the list of per‐county populations	obtained from the census.gov site linked 
here: https://www.dropbox.com/s/rj6b5l1il04c4ne/PEP_2014_PEPANNRES.xls?dl=01)

1) Generate a php script that is capable of taking the data from this file and 
uploading it to a MySql database table. Please also include the code to generate 
the table. 
    a. Output should be a single .sql file that we could run to recreate the 
database table(s) and insert the rows.

2)Write a web page in PHP that allows a user to select one or more counties(based 
on the data source) and a single year. After submitting the selection the server 
should return an html table that summarizes the selection and includes the requested
population data. 

3) Optional/Bonus problemsa.
    a. If you were to render the data sorted by county name, instead of State,County AND 
you still wanted to merge rows where the same state came up consecutively, how would you 
do it? 
    b. Add stateand global totals to the table.	

-------------------------------------------------------------------------------------

File Path: 

Data source file:	PEP_2014_PEPANNRES.xls
PHP XLS Library:	SpreadsheetReader.php
			SpreadsheetReader_XLS.php
			excel_reader2.php
Database class: 	dbconfig.inc
			db.php
Read xls:  		readxlssql.php 
			readxlsphp.php 
HTML form related:  	index.html
			form.css
			getresult.php
			getcountylist.php

-------------------------------------------------------------------------------------

Load data into database: 

Script to read xls and generate a single .sql 
usage: php readxlssql.php PEP_2014_PEPANNRES.xls  
usage: mysql -u UserName -p DBName --default-character-set=Latin1 < population.sql 

Script to read xls and load data into database  (optional)
usage: php readxlsphp.php PEP_2014_PEPANNRES.xls 

-------------------------------------------------------------------------------------
Web Form: 

URL example: http://localhost/~User/index.html

-------------------------------------------------------------------------------------
Optional/Bonus problem 

a. 
getresult.php line 22: ORDER by county
getresult.php line 44: enable krsort();

b. the global total is included in the page. 
